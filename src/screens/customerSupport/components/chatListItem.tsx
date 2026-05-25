import { type FC } from "react";

import { Avatar, Box, Circle, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";

import type { ChatThread } from "../data";

interface Props {
  thread: ChatThread;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const ChatListItem: FC<Props> = ({ thread, isActive, onSelect }) => {
  return (
    <HStack
      align="flex-start"
      gap="3"
      px="4"
      py="3"
      mx="2"
      borderRadius="lg"
      cursor="pointer"
      bg={isActive ? "#E5F2F5" : "transparent"}
      _hover={{ bg: isActive ? "#E5F2F5" : "#F7F7F7" }}
      transition="background 0.15s ease"
      onClick={() => onSelect(thread.id)}
    >
      <Box position="relative" flexShrink={0}>
        <Avatar.Root size="md" bg="gray.200">
          <Avatar.Fallback name={thread.name} />
          {thread.avatar && <Avatar.Image src={thread.avatar} alt={thread.name} />}
        </Avatar.Root>

        {thread.online && (
          <Circle
            size="10px"
            bg="#22C55E"
            border="2px solid white"
            position="absolute"
            bottom="0"
            left="0"
          />
        )}
      </Box>

      <Stack gap="1" flex="1" minW="0">
        <Flex align="center" justify="space-between" gap="2">
          <Text
            fontSize="sm"
            fontWeight="semibold"
            color="dark"
            truncate
          >
            {thread.name}
          </Text>
          <Text fontSize="xs" color="gray.100" flexShrink={0}>
            {thread.time}
          </Text>
        </Flex>

        <Flex align="center" justify="space-between" gap="2">
          <HStack gap="1" minW="0" flex="1">
            {thread.outgoingRead && (
              <Box color="#013B4D" flexShrink={0} aria-label="read">
                <BsCheck2All size={14} />
              </Box>
            )}
            <Text
              fontSize="xs"
              color="gray.100"
              truncate
              flex="1"
            >
              {thread.lastMessage}
            </Text>
          </HStack>

          {thread.unreadCount > 0 && (
            <Circle
              size="18px"
              bg="#013B4D"
              color="white"
              fontSize="10px"
              fontWeight="semibold"
              flexShrink={0}
            >
              {thread.unreadCount}
            </Circle>
          )}
        </Flex>
      </Stack>
    </HStack>
  );
};

export default ChatListItem;
