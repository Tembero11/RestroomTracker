import { Request, Response } from "express";
import { z } from "zod";
import { postSchema } from "../schema/restroom";
import { createRestroom, getRestrooms, restroomsToGeoJson } from "../service/restroom";
import { Decimal } from "@prisma/client/runtime/library";

export async function getController(req: Request, res: Response) {
  try {
    const restrooms = await getRestrooms();

    res.status(200).json(restroomsToGeoJson(restrooms));
  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
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

    res.status(201).send();
    return;
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
}

export function patchController(req: Request, res: Response) {}

export function deleteController(req: Request, res: Response) {}
