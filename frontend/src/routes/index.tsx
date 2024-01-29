import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Container,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";

export default function IndexPage() {
  const filters = ["Men", "Women", "Free", "Always Open"];

  return (
    <Container m={0}>
      <HStack
        position="absolute"
        top={4}
        left={4}
        spacing={4}
        justifyContent="start"
        width="calc(100% - var(--chakra-space-4))"
      >
        <InputGroup maxW="250px">
          <Input placeholder="Search" />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        {filters.map((label) => (
          <Tag
            key={label}
            size="lg"
            variant="subtle"
            colorScheme="cyan"
            userSelect="none"
            cursor="pointer"
          >
            <TagLabel>{label}</TagLabel>
            <TagRightIcon boxSize="10px" as={CloseIcon} />
          </Tag>
        ))}
      </HStack>
      <Container></Container>
    </Container>
  );
}
