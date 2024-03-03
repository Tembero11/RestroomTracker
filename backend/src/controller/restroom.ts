import { Request, Response } from "express";
import { z } from "zod";
import postSchema from "../schema/restroom";
import { createRestroom } from "../service/restroom";
import { Decimal } from "@prisma/client/runtime/library";

export function getController(req: Request, res: Response) {
  
}

export async function postController(req: Request, res: Response) {
  const { name, lat, lng, sex, fee, accessible, code, notes } =
    req.body as z.infer<typeof postSchema.body>;

  try {
    await createRestroom(
      {
        name,
        fee: fee ? new Decimal(fee) : null,
        sex,
        accessible,
        code,
        notes,
      },
      lat,
      lng
    );
  } catch (err) {
    res.status(500).json({msg: "Internal Server Error"});
    return;
  }
}

export function patchController(req: Request, res: Response) {}

export function deleteController(req: Request, res: Response) {}
