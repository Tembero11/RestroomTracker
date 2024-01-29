import { Container, FormControl, HStack, Input, Tag } from "@chakra-ui/react";

export default function IndexPage() {
  const filters = ["Men", "Women", "Free", "Always Open"];

  return (
    <Container m={0}>
      <HStack>
        <Input/>
        <HStack spacing={4} justifyContent="start">
          {filters.map((label) => (
            <Tag key={label} size="lg" colorScheme="blue">
              {label}
            </Tag>
          ))}
        </HStack>
      </HStack>
      <Container></Container>
    </Container>
  );
}
