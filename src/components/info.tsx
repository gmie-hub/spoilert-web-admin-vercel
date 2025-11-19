import type { FC } from "react";

import { HStack, Image, Text } from "@chakra-ui/react";

interface InfoProps {
  info: string;
  actionText: string;
}

const Info: FC<InfoProps> = ({ info, actionText }) => {
  return (
    <HStack
      border="1px solid #A7E1FB"
      bg="#E0F4FD"
      py="2"
      px="3"
      borderRadius="lg"
      alignItems="center"
    >
      <Image src="/info.svg" alt="info" />
      
      <Text color="blue.100">
        {info}{" "}
        <Text as="span" fontWeight="semibold">
          {actionText}
        </Text>
      </Text>
    </HStack>
  );
};

export default Info;
