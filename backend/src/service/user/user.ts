import { $Enums } from "@prisma/client";
import { prisma } from "../..";
import { genSnowflake } from "../../util/snowflake";

export async function createUser(username: string, email: string, refreshToken: string, service: $Enums.OAuthService) {
    await prisma.user.create({
        data: {
            id: genSnowflake(),
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