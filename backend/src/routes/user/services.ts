import { Router, Express } from "express";
import * as discord from "../../controller/user/services/discord";
import oAuthCallback from "../../middleware/oAuth";
import { DISCORD_OAUTH_CLIENT_ID, DISCORD_OAUTH_CLIENT_SECRET } from "../..";
import expressAsyncHandler from "express-async-handler";

export const route = "/oauth2/discord";

const router = Router();

export default function registerRoutes(app: Express) {
    router.get(route, oAuthCallback({
        clientId: DISCORD_OAUTH_CLIENT_ID,
        clientSecret: DISCORD_OAUTH_CLIENT_SECRET,
        url: "https://discord.com/api/v10/oauth2/token",
        redirect: "http://localhost:8000/oauth2/discord/",
    }), expressAsyncHandler(discord.getController));

    app.use(router);
}