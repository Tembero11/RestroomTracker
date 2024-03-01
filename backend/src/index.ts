import express from "express";
import dotenv from "dotenv";
import * as userServices from "./routes/user/services";
import * as user from "./routes/user/user";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

// Load .env
dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// ENV
const PORT = +(process.env.PORT || 8000);

// OAuth2
export const DISCORD_OAUTH_CLIENT_SECRET = process.env.DISCORD_OAUTH_CLIENT_SECRET as string;
export const DISCORD_OAUTH_CLIENT_ID = process.env.DISCORD_OAUTH_CLIENT_ID as string;

export const prisma = new PrismaClient();

async function startServer(port: number) {
    user.registerRoutes(app);
    userServices.registerRoutes(app);
    
    app.listen(port, () => console.log("Server started successfully! 🎉"));   
}

startServer(PORT);