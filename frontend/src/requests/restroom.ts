export enum Sex {
  Men = "MEN",
  Women = "WOMEN",
  Both = "BOTH",
}

export interface IRestroom {
  id: BigInt;
  name: string;
  fee: number;
  sex: Sex;
  accessible?: boolean;
  code: string;
  notes: string;
  lat: number;
  lng: number;
  isCreatedByYou: boolean;
}

type IRawRestroom = IRestroom & { id: string };

export async function getRestroomById(id: bigint | string): Promise<IRestroom> {
  const url = `/api/restroom/${id.toString()}`;
  const res = await fetch(url, {
    method: "get",
  });

  if (!res.ok) {
    throw new Error("Unknown Error");
  }

  const body: IRawRestroom = await res.json();

  return {
    ...body,
    id: BigInt(body.id),
  }
}
