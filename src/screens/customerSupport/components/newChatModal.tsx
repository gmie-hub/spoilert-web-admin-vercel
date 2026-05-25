import { type FC, useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Dialog,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";
import { IoChevronForward } from "react-icons/io5";

import { Pagination } from "@spt/components";
import { InputGroup } from "@spt/components/ui/input-group";

import type { Contact } from "../data";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contacts: Contact[];
  /** Called when an entry is picked. Caller decides whether to start a new
   * thread or open the existing one. */
  onSelect: (contact: Contact) => void;
}

const PAGE_SIZE = 8;

const NewChatModal: FC<Props> = ({ open, onOpenChange, contacts, onSelect }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return contacts;
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q),
    );
  }, [contacts, search]);

  const startRange = (page - 1) * PAGE_SIZE;
  const visible = filtered.slice(startRange, startRange + PAGE_SIZE);

  const handlePick = (contact: Contact) => {
    onSelect(contact);
    onOpenChange(false);
    // Reset for next open
    setSearch("");
    setPage(1);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange(d.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="520px" mx="4">
            <Stack gap="4" p="6">
              {/* Header */}
              <Flex align="center" justify="space-between" gap="3">
                <Text fontSize="lg" fontWeight="semibold" color="dark">
                  Start New Chat
                </Text>

                <IconButton
                  aria-label="Close"
                  variant="outline"
                  size="sm"
                  borderRadius="full"
                  borderColor="#E0E0E0"
                  color="gray.500"
                  onClick={() => onOpenChange(false)}
                >
                  <HiX size={16} />
                </IconButton>
              </Flex>

              {/* Search */}
              <InputGroup
                startElement={
                  <Image src="/search-normal.svg" alt="" boxSize="16px" />
                }
              >
                <Input
                  placeholder="Search for a user, email address"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  bg="#FBFBFB"
                  border="1px solid #EFEFEF"
                  borderRadius="full"
                  h="44px"
                  fontSize="sm"
                  _placeholder={{ color: "gray.100", fontSize: "sm" }}
                />
              </InputGroup>

              {/* List */}
              <Stack
                gap="0"
                maxH={{ base: "55vh", md: "440px" }}
                overflowY="auto"
                minH="0"
              >
                {visible.length === 0 ? (
                  <Text
                    fontSize="sm"
                    color="gray.100"
                    textAlign="center"
                    py="10"
                  >
                    No users match your search.
                  </Text>
                ) : (
                  visible.map((contact) => (
                    <HStack
                      key={contact.id}
                      as="button"
                      onClick={() => handlePick(contact)}
                      gap="3"
                      py="3"
                      borderBottom="1px solid #F4F4F4"
                      cursor="pointer"
                      textAlign="left"
                      _hover={{ bg: "#FAFAFA" }}
                      transition="background 0.15s ease"
                      w="100%"
                    >
                      <Avatar.Root size="md" bg="gray.200" flexShrink={0}>
                        <Avatar.Fallback name={contact.name} />
                        {contact.avatar && (
                          <Avatar.Image
                            src={contact.avatar}
                            alt={contact.name}
                          />
                        )}
                      </Avatar.Root>

                      <Stack gap="0" flex="1" minW="0">
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="dark"
                          truncate
                        >
                          {contact.name}
                        </Text>
                        <Text fontSize="xs" color="gray.100" truncate>
                          {contact.email}
                        </Text>
                      </Stack>

                      <Box color="gray.100" flexShrink={0}>
                        <IoChevronForward size={18} />
                      </Box>
                    </HStack>
                  ))
                )}
              </Stack>

              {/* Pagination — only render when there's more than one page */}
              {filtered.length > PAGE_SIZE && (
                <Box pt="2">
                  <Pagination
                    page={page}
                    pageSize={PAGE_SIZE}
                    items={filtered}
                    onPageChange={(d: { page: number }) => setPage(d.page)}
                  />
                </Box>
              )}
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default NewChatModal;
