import { $Enums } from "@prisma/client";
import { prisma } from "../..";

export async function createUser(username: string, email: string, refreshToken: string, service: $Enums.OAuthService) {
    await prisma.user.create({
        data: {
            id: Math.floor(Math.random() * 100),
            username,
            email,
            services: {
                create: [
                    {
                        service,
                        refreshToken,
                    }
                ]
            }
        }
    });
}