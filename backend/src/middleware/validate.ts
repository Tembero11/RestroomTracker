import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export default function validate(schema: AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}