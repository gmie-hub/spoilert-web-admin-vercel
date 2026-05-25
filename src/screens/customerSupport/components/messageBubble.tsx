import { type FC } from "react";

import { Avatar, Box, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";

import type { ChatMessage } from "../data";

interface Props {
  message: ChatMessage;
  /** The avatar to show alongside the bubble. */
  avatar: string;
  name: string;
}

const MessageBubble: FC<Props> = ({ message, avatar, name }) => {
  const isOutgoing = message.direction === "outgoing";

  const bubble = (
    <Stack gap="1" maxW={{ base: "85%", md: "75%" }}>
      <Box
        bg={isOutgoing ? "#E5F2F5" : "#F4F4F4"}
        color="dark"
        px="4"
        py="3"
        borderRadius="2xl"
        borderTopLeftRadius={isOutgoing ? "2xl" : "sm"}
        borderTopRightRadius={isOutgoing ? "sm" : "2xl"}
        fontSize="sm"
        lineHeight="1.55"
        whiteSpace="pre-wrap"
      >
        {message.text}
      </Box>

      <HStack
        gap="1"
        alignSelf={isOutgoing ? "flex-end" : "flex-start"}
        color="gray.100"
        fontSize="10px"
      >
        <Text>{message.time}</Text>
        {isOutgoing && message.read && (
          <Box color="#013B4D" aria-label="read">
            <BsCheck2All size={14} />
          </Box>
        )}
      </HStack>
    </Stack>
  );

  const userAvatar = (
    <Avatar.Root size="sm" bg="gray.200" flexShrink={0}>
      <Avatar.Fallback name={name} />
      {avatar && <Avatar.Image src={avatar} alt={name} />}
    </Avatar.Root>
  );

  return (
    <Flex
      gap="2"
      justify={isOutgoing ? "flex-end" : "flex-start"}
      align="flex-end"
    >
      {!isOutgoing && userAvatar}
      {bubble}
      {isOutgoing && userAvatar}
    </Flex>
  );
};

export default MessageBubble;
