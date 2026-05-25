import { useMemo, useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import ChatListPanel from "./components/chatListPanel";
import ConversationPanel from "./components/conversationPanel";
import NewChatModal from "./components/newChatModal";
import ProfilePanel from "./components/profilePanel";
import {
  type ChatProfile,
  type ChatThread,
  type Contact,
  allContacts,
  chatThreads as seedThreads,
  conversationMessages,
  selectedProfile,
} from "./data";

/** Which panel is in front on small screens. Ignored at `lg` and above. */
type MobileView = "list" | "conversation" | "profile";

/**
 * The parent Layout's content container is sized to `calc(100vh - 60px)` and
 * adds ~24px of vertical padding, plus the page header is actually ~76px tall
 * (Layout assumes 60). So the safe ceiling for a fixed-height screen here is
 * roughly `calc(100vh - 140px)`. On viewports shorter than `minH`, we let the
 * outer page scroll instead of squashing the panels into uselessness.
 */
const SCREEN_HEIGHT = { base: "auto", md: "calc(100vh - 140px)" };
const SCREEN_MIN_HEIGHT = "600px";

/** Reusable card-like surface for each panel. Plain Box avoids the Card
 *  recipe's intrinsic flex behaviors interfering with the height chain. */
const panelSurface = {
  bg: "white",
  borderRadius: "xl" as const,
  border: "1px solid #EFEFEF",
  overflow: "hidden" as const,
};

const CustomerSupport = () => {
  const [threads, setThreads] = useState<ChatThread[]>(seedThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>("ogunsola");
  const [mobileView, setMobileView] = useState<MobileView>("list");
  const [newChatOpen, setNewChatOpen] = useState(false);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) ?? threads[0],
    [threads, activeThreadId],
  );

  const activeProfile: ChatProfile = useMemo(() => {
    if (activeThread.id === "ogunsola") return selectedProfile;
    return {
      name: activeThread.name,
      email: `${activeThread.id}@spoilert.app`,
      role: "Learner",
      joinedDate: "Joined 2025",
      avatar: activeThread.avatar,
    };
  }, [activeThread]);

  const handleSelect = (id: string) => {
    setActiveThreadId(id);
    setMobileView("conversation");
  };

  const handleStartNewChat = (contact: Contact) => {
    const existing = threads.find((t) => t.id === contact.id);
    if (!existing) {
      const newThread: ChatThread = {
        id: contact.id,
        name: contact.name,
        avatar: contact.avatar,
        lastMessage: "",
        time: "Just now",
        unreadCount: 0,
      };
      setThreads((prev) => [newThread, ...prev]);
    }
    setActiveThreadId(contact.id);
    setMobileView("conversation");
  };

  return (
    <Box h={SCREEN_HEIGHT} minH={SCREEN_MIN_HEIGHT}>
      <Flex
        gap={{ base: "3", lg: "4" }}
        h="100%"
        minH={SCREEN_MIN_HEIGHT}
        align="stretch"
        direction={{ base: "column", lg: "row" }}
      >
        {/* List + Conversation share one surface on desktop */}
        <Box
          {...panelSurface}
          flex="1"
          minH="0"
          h={{ base: "calc(100vh - 220px)", lg: "100%" }}
        >
          <Flex h="100%" minH="0">
            <Box
              w={{ base: "100%", lg: "340px" }}
              flexShrink={0}
              display={{
                base: mobileView === "list" ? "block" : "none",
                lg: "block",
              }}
              h="100%"
              minH="0"
            >
              <ChatListPanel
                threads={threads}
                activeThreadId={activeThreadId}
                onSelect={handleSelect}
                onStartNewChat={() => setNewChatOpen(true)}
              />
            </Box>

            <Box
              flex="1"
              display={{
                base: mobileView === "conversation" ? "block" : "none",
                lg: "block",
              }}
              h="100%"
              minH="0"
            >
              <ConversationPanel
                thread={activeThread}
                initialMessages={
                  activeThread.id === "ogunsola" ? conversationMessages : []
                }
                onBack={() => setMobileView("list")}
                onOpenProfile={() => setMobileView("profile")}
              />
            </Box>
          </Flex>
        </Box>

        {/* Profile is its own surface on desktop, a full takeover on mobile */}
        <Box
          {...panelSurface}
          flex={{ lg: "0 0 300px" }}
          minH="0"
          h={{ base: "auto", lg: "100%" }}
          display={{
            base: mobileView === "profile" ? "block" : "none",
            lg: "block",
          }}
        >
          <ProfilePanel
            profile={activeProfile}
            onBack={() => setMobileView("conversation")}
          />
        </Box>
      </Flex>

      <NewChatModal
        open={newChatOpen}
        onOpenChange={setNewChatOpen}
        contacts={allContacts}
        onSelect={handleStartNewChat}
      />
    </Box>
  );
};

export default CustomerSupport;
