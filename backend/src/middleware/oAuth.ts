import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export interface IOAuthResponse {
    accessToken: string;
    refreshToken: string;
}

interface IOAuthCallbackOptions {
    clientId: string
    clientSecret: string
    url: string
    redirect: string
}


export default function oAuthCallback({ clientId, clientSecret, url, redirect }: IOAuthCallbackOptions) {
    async function getHandler(req: Request, res: Response, next: NextFunction) {
        const code = req.query.code;
        
        if (!code) {
            res.status(401).send();
            return;
        }

        const response = await fetch(url, {
            method: "POST",
            body: new URLSearchParams({
                'client_id': clientId,
                'client_secret': clientSecret,
                'grant_type': 'authorization_code',
                'code': code as string,
                'redirect_uri': redirect,
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        if (!response.ok) {
            res.redirect("/login");
            return;
        }
        const responseJson = await response.json();
        req.oAuth = {
            accessToken: responseJson["access_token"],
            refreshToken: responseJson["refresh_token"]
        }
        next();
    }

    return expressAsyncHandler(getHandler);
}