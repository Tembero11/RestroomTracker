import { Request, Response } from "express";
import { z } from "zod";
import { postSchema } from "../schema/restroom";
import {
  createRestroom,
  getRestroomById,
  getRestrooms,
  restroomsToGeoJson,
} from "../service/restroom";
import { Decimal } from "@prisma/client/runtime/library";

export async function getGeoJsonController(req: Request, res: Response) {
  try {
    const restrooms = await getRestrooms();

    res.status(200).json(restroomsToGeoJson(restrooms));
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
    return;
  }
}

export async function getSingleController(req: Request, res: Response) {
  try {
    const userId = req.context?.id;

    const dbResult = await getRestroomById(BigInt(req.params.id as string));

    if (!dbResult) {
      res.status(404).send();
      return;
    }

    const { id, fee, authorId, ...restroom } = dbResult;

    res.status(200).json({
      ...restroom,
      id: id.toString(),
      fee: fee?.toNumber(),
      isCreatedByYou: userId === authorId,
    });
  } catch (err) {
    console.log(err);
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
        authorId: req.context.id,
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
