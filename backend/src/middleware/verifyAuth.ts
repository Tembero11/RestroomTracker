import { NextFunction, Request, Response } from "express";
import { findUserById, verifyToken } from "../service/user/user";
import expressAsyncHandler from "express-async-handler";

async function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const bearer = req.get("Authorization") || req.cookies["Authorization"];
    
    if (typeof bearer !== "string") {
        res.status(403).json({msg: "Forbidden"});
        return;
    }

    const token = bearer.substring("Bearer ".length);

    try {
        const decoded = await verifyToken(token);
        console.log(decoded);
        const user = await findUserById(BigInt(decoded.id));
        if (user?.email != decoded.email) {
            res.status(404).json({msg: "User not found"});
            return;
        }
        req.context = user;
        next();
    } catch (err) {
        console.log(err);
    }

    res.status(403).json({msg: "Forbidden"});
}

export default expressAsyncHandler(verifyAuth);