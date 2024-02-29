import { Request, Response } from "express";
import { z } from "zod";
import { patchSchema } from "../../schema/user";
import { modifyUser } from "../../service/user/user";

export function getController(req: Request, res: Response) {
    const { context: {id, username, email, isComplete, lastLogin} } = req;
    
    res.status(200).json({
        id: id.toString(),
        username,
        email,
        isComplete,
        lastLogin: lastLogin.toISOString(),
    })
}

export function postController(req: Request, res: Response) {
    
}

export async function patchController(req: Request, res: Response) {
    const { username } = req.body as z.infer<typeof patchSchema.body>;
    const { id } = req.context;

    try {
        await modifyUser(id, username);
    } catch (err) {
        res.status(500).json({msg: "Internal Server Error"});
        return;
    }

    res.status(204).send();
}

export function deleteController(req: Request, res: Response) {
    
}