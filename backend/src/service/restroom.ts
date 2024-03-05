import { Restroom } from "@prisma/client";
import { prisma } from "..";
import { genSnowflake } from "../util/snowflake";
import { Decimal } from "@prisma/client/runtime/library";

export async function createRestroom(restroom: Omit<Restroom, "id" | "lat" | "lng">, lat: number, lng: number) {
  const snowflake = genSnowflake();

  prisma.restroom.create({
    data: {
      id: snowflake,
      ...restroom,
      lat: new Decimal(lat),
      lng: new Decimal(lng),
    },
  });
}


export async function getRestrooms() {
  return await prisma.restroom.findMany();
}

export function restroomsToGeoJson(restrooms: Restroom[]): object {
  const features = restrooms.map((restroom) => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [restroom.lng.toNumber(), restroom.lat.toNumber()]
      },
      properties: {
        id: restroom.id.toString(),
      }
    }
  });

  return {
    type: "FeatureCollection",
    features
  };
}