import Button from "../components/general/Button/Button";
import Card from "../components/general/Card/Card";
import { Center, VStack } from "../components/general/Stack/Stack";

export default function LoginPage() {
  return (
    <Center h="100vh">
      <Card>
        <h1>Choose your login strategy</h1>
        <VStack alignItems="stretch" w="100%">
          <a href={(import.meta as any).env.VITE_DISCORD_OAUTH2_LINK}>
            <Button variant="secondary" style={{width: "100%"}}>Discord</Button>
          </a>
        </VStack>
      </Card>
    </Center>
  );
}
