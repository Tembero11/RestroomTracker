import express from "express";
import dotenv from "dotenv";
import router from "./routes/user/services";
import registerRoutes from "./routes/user/services";
import { PrismaClient } from "@prisma/client";

// Load .env
dotenv.config();

const app = express();

// ENV
const PORT = +(process.env.PORT || 8000);

// OAuth2
export const DISCORD_OAUTH_CLIENT_SECRET = process.env.DISCORD_OAUTH_CLIENT_SECRET as string;
export const DISCORD_OAUTH_CLIENT_ID = process.env.DISCORD_OAUTH_CLIENT_ID as string;

export const prisma = new PrismaClient();

async function startServer(port: number) {
    registerRoutes(app);
    app.listen(port, () => console.log("Server started successfully! 🎉"));   
}

startServer(PORT);