import { Request, Response } from "express";

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

export function patchController(req: Request, res: Response) {
    
}

export function deleteController(req: Request, res: Response) {
    
}