import { $Enums } from "@prisma/client";
import { z } from "zod";

export const getSchema = {
  query: z.object({
    minLat: z.coerce.number(),
    minLng: z.coerce.number(),
    maxLat: z.coerce.number(),
    maxLng: z.coerce.number(),
  }),
};

export const postSchema = {
  body: z.object({
    name: z.string().min(2).max(32),
    sex: z.nativeEnum($Enums.Sex),
    fee: z.number().nullable(),
    code: z.string().min(2).max(8).nullable(),
    accessible: z.boolean().nullable(),
    notes: z.string(),

    lat: z.number(),
    lng: z.number(),
  }),
};
