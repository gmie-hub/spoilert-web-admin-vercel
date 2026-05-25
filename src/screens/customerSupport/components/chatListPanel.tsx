import { type FC, useMemo, useState } from "react";

import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";

import { InputGroup } from "@spt/components/ui/input-group";

import type { ChatThread } from "../data";

import ChatListItem from "./chatListItem";

type TabValue = "all" | "unread";

interface Props {
  threads: ChatThread[];
  activeThreadId: string;
  onSelect: (id: string) => void;
  onStartNewChat: () => void;
}

const ChatListPanel: FC<Props> = ({
  threads,
  activeThreadId,
  onSelect,
  onStartNewChat,
}) => {
  const [tab, setTab] = useState<TabValue>("all");
  const [search, setSearch] = useState("");

  const filteredThreads = useMemo(() => {
    const bySearch = (t: ChatThread) =>
      !search ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.lastMessage.toLowerCase().includes(search.toLowerCase());

    const byTab = (t: ChatThread) =>
      tab === "all" ? true : t.unreadCount > 0;

    return threads.filter((t) => byTab(t) && bySearch(t));
  }, [threads, search, tab]);

  const totalCount = threads.length;
  const unreadCount = threads.filter((t) => t.unreadCount > 0).length;

  return (
    <Flex
      flexDirection="column"
      gap="4"
      h="100%"
      minH="0"
      py="5"
      borderInlineEnd={{ lg: "1px solid #EFEFEF" }}
    >
      {/* Header */}
      <Flex align="center" justify="space-between" gap="3" px="5" flexShrink={0}>
        <Heading fontSize="xl" fontWeight="semibold" color="dark">
          Chat
        </Heading>

        <Button
          variant="yellow"
          h="40px"
          px="4"
          fontSize="sm"
          borderRadius="full"
          onClick={onStartNewChat}
        >
          <Image src="/add-circle.svg" alt="" boxSize="18px" />
          Start A New Chat
        </Button>
      </Flex>

      {/* Tabs */}
      <HStack
        gap="6"
        px="5"
        borderBottom="1px solid #EFEFEF"
        flexShrink={0}
      >
        <TabTrigger
          label="All"
          count={totalCount}
          active={tab === "all"}
          onClick={() => setTab("all")}
        />
        <TabTrigger
          label="Unread"
          count={unreadCount}
          active={tab === "unread"}
          onClick={() => setTab("unread")}
        />
      </HStack>

      {/* Search */}
      <Box px="5" flexShrink={0}>
        <InputGroup
          startElement={
            <Image src="/search-normal.svg" alt="" boxSize="16px" />
          }
        >
          <Input
            placeholder="Search for a user, chat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            borderRadius="full"
            h="40px"
            fontSize="sm"
            _placeholder={{ color: "gray.100", fontSize: "sm" }}
          />
        </InputGroup>
      </Box>

      {/* Thread list */}
      <Stack gap="1" overflowY="auto" flex="1" minH="0" pb="2">
        {filteredThreads.length === 0 ? (
          <Text px="5" fontSize="sm" color="gray.100">
            No chats found.
          </Text>
        ) : (
          filteredThreads.map((thread) => (
            <ChatListItem
              key={thread.id}
              thread={thread}
              isActive={thread.id === activeThreadId}
              onSelect={onSelect}
            />
          ))
        )}
      </Stack>
    </Flex>
  );
};

interface TabTriggerProps {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}

const TabTrigger: FC<TabTriggerProps> = ({ label, count, active, onClick }) => (
  <HStack
    as="button"
    onClick={onClick}
    gap="2"
    pb="3"
    pt="1"
    borderBottom="2px solid"
    borderColor={active ? "blue.100" : "transparent"}
    color={active ? "blue.100" : "gray.100"}
    fontWeight={active ? "semibold" : "medium"}
    fontSize="sm"
    cursor="pointer"
    mb="-1px"
  >
    <Text>{label}</Text>
    {count !== undefined && (
      <Circle
        size="20px"
        bg={active ? "#013B4D" : "gray.200"}
        color={active ? "white" : "gray.100"}
        fontSize="xs"
        fontWeight="semibold"
      >
        {count}
      </Circle>
    )}
  </HStack>
);

export default ChatListPanel;
