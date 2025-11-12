import type { FC, ReactNode } from "react";

import {
  type BoxProps,
  HStack,
  Image,
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
}) => {
  const hasTimestamp = Boolean(createdAt);

  return (
    <Card {...cardProps}>
      <Stack gap="3" {...stackProps}>
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

        {content ? <Text color="#666869">{content}</Text> : null}

        {extraContent}

        {actions}
      </Stack>
    </Card>
  );
};

export default CommunityPostCard;
