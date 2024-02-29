import { Request, Response, NextFunction } from "express";
import { ZodRawShape, z } from "zod";

export default function validate(schema: ZodRawShape) {
    const zodSchema = z.object(schema);
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await zodSchema.parseAsync({
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