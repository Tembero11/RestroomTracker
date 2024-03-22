import { useEffect, useState } from "react";
import { completeProfile } from "../../requests/user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import TextField from "../../components/general/TextField/TextField";
import { Center, HStack } from "../../components/general/Stack/Stack";
import Card from "../../components/general/Card/Card";
import Button from "../../components/general/Button/Button";

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
    <Center h="100vh">
      <Card>
        <form onSubmit={onSubmit}>
          <h1>Set Username</h1>
          <HStack gap={8}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button type="submit">Finish</Button>
          </HStack>
        </form>
      </Card>
    </Center>
  );
}
