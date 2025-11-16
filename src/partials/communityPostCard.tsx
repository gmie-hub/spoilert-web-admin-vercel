import type { FC, ReactNode } from "react";

import {
  Box,
  type BoxProps,
  HStack,
  IconButton,
  Image,
  Menu,
  Portal,
  Separator,
  Stack,
  type StackProps,
  Text,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import { formatDate, formatTime } from "@spt/utils/dateTime";

interface CommunityPostCardProps {
  authorName?: string;
  avatarSrc?: string;
  createdAt?: string;
  content?: string | null;
  extraContent?: ReactNode;
  actions?: ReactNode;
  cardProps?: Pick<
    BoxProps,
    "bg" | "borderColor" | "borderWidth" | "borderStyle"
  >;
  stackProps?: StackProps;
  onDeleteClick?: () => void;
  showMenu?: boolean;
}

const CommunityPostCard: FC<CommunityPostCardProps> = ({
  authorName = "Mary Coker",
  avatarSrc = "/user-icon.svg",
  createdAt,
  content,
  extraContent,
  actions,
  cardProps,
  stackProps,
  onDeleteClick,
  showMenu = true,
}) => {
  const hasTimestamp = Boolean(createdAt);

  return (
    <Card hasBoxShadow {...cardProps}>
      <Stack gap="3" {...stackProps}>
        <HStack justifyContent="space-between">
          <HStack gap="3">
            <Image src={avatarSrc} alt="user" boxSize="10" />

            <Stack gap="0.5">
              <Text color="#96189A" fontSize="lg" fontWeight="medium">
                {authorName}
              </Text>

              {hasTimestamp ? (
                <Text color="#999B9D" fontSize="sm">
                  {formatDate(createdAt as string)} •{" "}
                  {formatTime(createdAt as string)}
                </Text>
              ) : null}
            </Stack>
          </HStack>

          {showMenu && (
            <Menu.Root>
              <Menu.Trigger asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  _hover={{ backgroundColor: "transparent" }}
                  _focus={{ backgroundColor: "transparent" }}
                >
                  <Image src="/more.svg" alt="more" />
                </IconButton>
              </Menu.Trigger>

              <Portal>
                <Menu.Positioner>
                  <Menu.Content
                    display="flex"
                    flexDir="column"
                    w="200px"
                    gap="2"
                    px="3"
                  >
                    <Menu.Item value="edit">
                      <Image src="/edit-dark.svg" alt="edit" />
                      <Box flex="1">Edit Post</Box>
                    </Menu.Item>

                    <Separator />

                    <Menu.Item value="delete-post" onClick={onDeleteClick}>
                      <Image src="/trash.svg" alt="delete" />
                      <Box flex="1" color="red">
                        Delete Post
                      </Box>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          )}
        </HStack>

        {content ? <Text color="#666869">{content}</Text> : null}

        {extraContent}

        {actions}
      </Stack>
    </Card>
  );
};

export default CommunityPostCard;
