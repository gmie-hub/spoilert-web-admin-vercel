import type { FC } from "react";

import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  heading: string;
  description?: string;
  onClick?: () => void;
}

const SuccessModalContent: FC<ComponentProps> = ({
  description,
  heading,
  onClick,
}) => {
  return (
    <Stack gap="8">
      <HStack justifyContent="center">
        <Image src="/success.gif" w="150px" h="150px" alt="danger" />
      </HStack>

      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="medium">
          {heading}
        </Text>

        {description && <Text color="gray">{description}</Text>}
      </Stack>

      <Button variant="yellow" onClick={onClick}>
        Done
      </Button>
    </Stack>
  );
};

export default SuccessModalContent;