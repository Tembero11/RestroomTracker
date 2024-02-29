import { Request, Response } from "express";
import { getDiscordUser } from "../../../service/user/services/discord";
import { createUser, signToken } from "../../../service/user/user";
import { $Enums } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { genSnowflake } from "../../../util/snowflake";

export async function getController(req: Request, res: Response) {
  const discordUser = await getDiscordUser(req.oAuth!.accessToken);

  const snowflake = genSnowflake();

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

    if (err.code == "P2002" && err.meta?.target == "User_email_key") {
        // TODO: Should login instead
    }
    return;
  }


  const token = await signToken({
    id: snowflake.toString(),
    email: discordUser.email,
  });


  res.status(201).cookie("Authorization", `Bearer ${token}`);
}
