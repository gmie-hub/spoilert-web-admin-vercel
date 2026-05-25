import { type FC } from "react";

import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";

import type { ChatProfile } from "../data";

interface Props {
  profile: ChatProfile;
  /** On small screens this returns the user to the conversation. */
  onBack?: () => void;
  onViewFullProfile?: () => void;
}

const ProfilePanel: FC<Props> = ({ profile, onBack, onViewFullProfile }) => {
  return (
    <Stack
      gap="4"
      h="100%"
      py="6"
      px={{ base: "5", md: "6" }}
      align="center"
    >
      {onBack && (
        <Flex w="100%" display={{ base: "flex", lg: "none" }}>
          <IconButton
            aria-label="Back to conversation"
            variant="ghost"
            size="sm"
            onClick={onBack}
          >
            <IoChevronBack size={20} />
          </IconButton>
        </Flex>
      )}

      <Avatar.Root size="2xl" bg="gray.200">
        <Avatar.Fallback name={profile.name} />
        {profile.avatar && (
          <Avatar.Image src={profile.avatar} alt={profile.name} />
        )}
      </Avatar.Root>

      <Stack gap="2" align="center" textAlign="center">
        <Text fontSize="lg" fontWeight="semibold" color="dark">
          {profile.name}
        </Text>
        <Text fontSize="sm" color="gray.100">
          {profile.email}
        </Text>
      </Stack>

      <Box
        px="3"
        py="1"
        bg="#F4F4F4"
        borderRadius="md"
        fontSize="xs"
        fontWeight="medium"
        color="gray.500"
      >
        {profile.role}
      </Box>

      <Text fontSize="xs" color="gray.100">
        {profile.joinedDate}
      </Text>

      <Button
        variant="yellowOutline"
        h="44px"
        px="6"
        fontSize="sm"
        borderRadius="lg"
        onClick={onViewFullProfile}
      >
        View Full Profile
      </Button>
    </Stack>
  );
};

export default ProfilePanel;
