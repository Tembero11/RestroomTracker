import { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getUser } from "../../requests/user";

export function CompleteAccountPage() {
  const [username, setUsername] = useState("");
  const [user, isLoading, error] = useApi(getUser);

  useEffect(() => setUsername(user?.username || ""), [user?.username]);

  
  function onSubmit(e:  React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        {
          isLoading ? <input type="text" value={username} /> : <></>
        }
      </label>
      <button type="submit">Finish</button>
    </form>
  );
}
