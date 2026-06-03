import type { FC } from "react";

import { Button, HStack, Stack, Text, Textarea } from "@chakra-ui/react";

interface ComponentProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageBox: FC<ComponentProps> = ({ value, onChange, onSend }) => (
  <Stack
    gap="3"
    p="4"
    border="1px solid #EFEFEF"
    borderRadius="xl"
    bg="#FBFBFB"
  >
    <Text fontWeight="medium">Send a Message</Text>

    <Textarea
      placeholder="Type in your message here for the tutor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      bg="white"
      border="1px solid #EFEFEF"
      borderRadius="lg"
      minH="90px"
      _placeholder={{ fontSize: "sm", color: "gray.100" }}
    />

    <HStack justify="flex-end">
      <Button variant="yellow" px="6" disabled={!value.trim()} onClick={onSend}>
        Send Message
      </Button>
    </HStack>
  </Stack>
);

export default MessageBox;
