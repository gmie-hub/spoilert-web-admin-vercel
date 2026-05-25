import { type FC, useEffect, useRef, useState } from "react";

import {
  Avatar,
  Box,
  Circle,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiOutlineMicrophone } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";

import type { ChatMessage, ChatThread } from "../data";

import MessageBubble from "./messageBubble";

interface Props {
  thread: ChatThread;
  /** Seed messages for the current thread. Resets when the thread id changes. */
  initialMessages: ChatMessage[];
  /** On small screens this returns the user to the chat list. */
  onBack?: () => void;
  /** On small screens this opens the profile view. */
  onOpenProfile?: () => void;
}

const ConversationPanel: FC<Props> = ({
  thread,
  initialMessages,
  onBack,
  onOpenProfile,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset the visible messages whenever the user switches chats.
  useEffect(() => {
    setMessages(initialMessages);
    setDraft("");
  }, [thread.id, initialMessages]);

  // Keep the conversation scrolled to the newest message.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        direction: "outgoing",
        text,
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
        read: false,
      },
    ]);
    setDraft("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Flex
      flexDirection="column"
      h="100%"
      minH="0"
      borderInlineEnd={{ lg: "1px solid #EFEFEF" }}
    >
      {/* Header — fixed at top */}
      <HStack
        gap="3"
        px={{ base: "4", md: "6" }}
        py="4"
        borderBottom="1px solid #EFEFEF"
        flexShrink={0}
      >
        {onBack && (
          <IconButton
            aria-label="Back to chat list"
            variant="ghost"
            size="sm"
            display={{ base: "inline-flex", lg: "none" }}
            onClick={onBack}
          >
            <IoChevronBack size={20} />
          </IconButton>
        )}

        <HStack
          gap="3"
          flex="1"
          cursor={onOpenProfile ? "pointer" : "default"}
          onClick={onOpenProfile}
        >
          <Avatar.Root size="md" bg="gray.200">
            <Avatar.Fallback name={thread.name} />
            {thread.avatar && (
              <Avatar.Image src={thread.avatar} alt={thread.name} />
            )}
          </Avatar.Root>

          <Stack gap="0">
            <Text fontSize="md" fontWeight="semibold" color="dark">
              {thread.name}
            </Text>
            <HStack gap="1.5">
              <Circle size="8px" bg="#22C55E" />
              <Text fontSize="xs" color="gray.100">
                Online
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </HStack>

      {/* Messages */}
      <Box flex="1" minH="0" overflowY="auto">
        {messages.length === 0 ? (
          <VStack
            justify="center"
            align="center"
            h="100%"
            px="6"
            gap="3"
            textAlign="center"
          >
            <Image src="/empty.png" alt="" boxSize={{ base: "120px", md: "150px" }} opacity={0.85} />
            <Text fontSize="lg" fontWeight="semibold" color="dark">
              No Conversation Yet!
            </Text>
            <Text fontSize="sm" color="gray.100">
              Type in your message to start a conversation
            </Text>
          </VStack>
        ) : (
          <Stack
            gap="4"
            px={{ base: "4", md: "6" }}
            py="6"
          >
            <DateSeparator label="Today" />

            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                avatar={thread.avatar}
                name={thread.name}
              />
            ))}

            <Box ref={messagesEndRef} />
          </Stack>
        )}
      </Box>

      {/* Composer — fixed at bottom */}
      <Box
        px={{ base: "4", md: "6" }}
        py="4"
        borderTop="1px solid #EFEFEF"
        flexShrink={0}
      >
        <Flex
          align="center"
          gap="2"
          bg="#FBFBFB"
          border="1px solid #EFEFEF"
          borderRadius="full"
          pl="3"
          pr="2"
          py="1"
        >
          <Image src="/emoji.svg" alt="" boxSize="20px" flexShrink={0} />

          <Input
            placeholder="Send a message…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            bg="transparent"
            border="none"
            outline="none"
            boxShadow="none"
            _focus={{ boxShadow: "none", outline: "none" }}
            _focusVisible={{ boxShadow: "none", outline: "none" }}
            fontSize="sm"
            color="dark"
            _placeholder={{ color: "gray.100" }}
            flex="1"
            px="1"
            h="36px"
          />

          <IconButton
            aria-label="Attach file"
            variant="ghost"
            size="sm"
            color="gray.100"
            flexShrink={0}
          >
            <Image src="/attachment.svg" alt="" boxSize="18px" />
          </IconButton>

          <IconButton
            aria-label="Voice note"
            variant="ghost"
            size="sm"
            color="gray.100"
            flexShrink={0}
          >
            <HiOutlineMicrophone size={18} />
          </IconButton>

          <IconButton
            aria-label="Send message"
            bg="blue.100"
            color="white"
            borderRadius="full"
            size="sm"
            onClick={handleSend}
            disabled={!draft.trim()}
            flexShrink={0}
            _hover={{ bg: "blue.100", opacity: 0.9 }}
            _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            <Image
              src="/send.svg"
              alt=""
              boxSize="16px"
              filter="brightness(0) invert(1)"
            />
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
};

const DateSeparator: FC<{ label: string }> = ({ label }) => (
  <Flex align="center" justify="center">
    <Box
      px="3"
      py="1"
      bg="#F4F4F4"
      borderRadius="full"
      fontSize="xs"
      color="gray.100"
    >
      {label}
    </Box>
  </Flex>
);

export default ConversationPanel;
