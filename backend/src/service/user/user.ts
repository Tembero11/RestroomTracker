import { $Enums } from "@prisma/client";
import { prisma } from "../..";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export async function createUser(
  id: bigint,
  username: string,
  email: string,
  refreshToken: string,
  service: $Enums.OAuthService
) {
  await prisma.user.create({
    data: {
      id,
      username,
      email,
      services: {
        create: [
          {
            service,
            refreshToken,
          },
        ],
      },
    },
  });
}

export async function createService(
  userId: bigint,
  refreshToken: string,
  service: $Enums.OAuthService
) {
  await prisma.userService.create({
    data: {
      id: userId,
      service,
      refreshToken,
    },
  });
}

const PRIVATE_KEY = fs.readFileSync(path.join(process.cwd(), "security", "jwtRS256.key"));

export interface ITokenPayload {
  id: string;
  email: string;
}

export function signToken(payload: ITokenPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      PRIVATE_KEY,
      { algorithm: "RS256", expiresIn: "30d", issuer: "RestroomTracker" },
      function (err, token) {
        if (!err && token) {
            resolve(token);
            return;
        }
        reject(err);
      }
    );
  });
}
