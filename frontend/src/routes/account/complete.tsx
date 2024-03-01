import { useEffect, useState } from "react";
import { completeProfile } from "../../requests/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export function CompleteAccountPage() {
  const [username, setUsername] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => setUsername(user?.username || ""), [user?.username]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO: error handling & form validation
    completeProfile(username).then(() => navigate("/"));
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        <span>Username</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button type="submit">Finish</button>
    </form>
  );
}
