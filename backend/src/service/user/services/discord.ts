const DISCORD_API_ENDPOINT = "https://discord.com/api/v10"

interface IDiscordUser {
    username: string
    email: string
    verified: boolean
}

export async function getDiscordUser(accessToken: string): Promise<IDiscordUser> {
    const url = `${DISCORD_API_ENDPOINT}/users/@me`;

    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });

    const body = await response.json();

    return {
        username: body.username,
        email: body.email,
        verified: body.verified,
    }
}