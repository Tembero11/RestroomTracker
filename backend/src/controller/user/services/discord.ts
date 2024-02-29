import { Request, Response } from "express";
import { getDiscordUser } from "../../../service/user/services/discord";
import {
  createUser,
  findUserByEmail,
  signToken,
  upsertService,
} from "../../../service/user/user";
import { $Enums } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { genSnowflake } from "../../../util/snowflake";

export async function getController(req: Request, res: Response) {
  const discordUser = await getDiscordUser(req.oAuth!.accessToken);

  let snowflake = genSnowflake();

  try {
    await createUser(
      snowflake,
      discordUser.username,
      discordUser.email,
      req.oAuth!.refreshToken,
      $Enums.OAuthService.DISCORD
    );
  } catch (err) {
    console.log(err);

    if (!(err instanceof PrismaClientKnownRequestError)) {
      res.status(500);
      return;
    }

    // This condition is fulfilled if the user existis already
    if (err.code == "P2002" && err.meta?.target == "User_email_key") {
      const user = await findUserByEmail(discordUser.email);

      await upsertService(
        user!.id,
        req.oAuth!.refreshToken,
        $Enums.OAuthService.DISCORD
      );

      // Modify the id to the already existing user
      snowflake = user!.id;
    } else {
      return;
    }
  }

  // TODO: update last login

  const token = await signToken({
    id: snowflake.toString(),
    email: discordUser.email,
  });

  res.status(201).cookie("Authorization", `Bearer ${token}`, {
    httpOnly: true,
  }).redirect("/");
}
