import { Request, Response } from "express";
import { getDiscordUser } from "../../../service/user/services/discord";
import { createUser } from "../../../service/user/user";
import { $Enums } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function getController(req: Request, res: Response) {
  const discordUser = await getDiscordUser(req.oAuth!.accessToken);

  try {
    await createUser(
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

    if (err.code == "P2002") {
        // TODO: handler user login case
    }
    return;
  }
}
