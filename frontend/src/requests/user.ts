export interface IUser {
  username: string;
  email: string;
  isComplete: boolean;
  lastLogin: Date;
}

type IRawUser = IUser & {lastLogin: string}

export async function getUser(): Promise<IUser> {
  const url = `/api/user`;
  const res = await fetch(url, {
    method: "get"
  });

  if (!res.ok) {
    throw new Error("Unknown Error");
  }

  const body: IRawUser = await res.json();

  return {
    username: body.username,
    email: body.email,
    isComplete: body.isComplete,
    lastLogin: new Date(body.lastLogin),
  }
}

export async function completeProfile(username: string) {
  const url = `/api/user`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username})
  });

  if (!res.ok) {
    throw new Error("Unknown Error");
  }
}