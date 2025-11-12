import type { FC } from "react";

import {
  Button,
  HStack,
  Heading,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useGetCommunityUsersQuery } from "@spt/hooks/api/useGetCommunityUsersQuery";
import type {
  CommunitiesDatum,
  CommunityPostDatum,
} from "@spt/types/community";

import { CommunityMembers } from "./communityMembers";
import { CommunityPostThread } from "./communityPostThread";

interface CommunityPostsProps {
  communityData: CommunitiesDatum;
  postData: CommunityPostDatum[];
  communityId: number;
}

const CommunityPosts: FC<CommunityPostsProps> = ({
  communityData,
  postData,
  communityId,
}) => {
  const hasPosts = postData?.length > 0;
  const { communityUserData } = useGetCommunityUsersQuery(communityId);

  return (
    <Stack>
      <HStack justifyContent="space-between" alignItems="center">
        <Stack>
          <HStack>
            <Heading>{communityData?.name}</Heading>
          </HStack>

          <Text color="gray.500">{communityData?.total_members} Members</Text>
          <Text color="gray.500">{communityData?.description}</Text>
        </Stack>

        <Button variant="yellow">
          <Image src="/edit_new.svg" alt="edit" /> Write A Post
        </Button>
      </HStack>

      <Separator />

      <HStack mt="3" gap="8" alignItems="flex-start">
        <Stack gap="3" w={{ md: "70%" }}>
          {hasPosts ? (
            postData.map((post) => (
              <CommunityPostThread key={post?.id} post={post} />
            ))
          ) : (
            <Text color="gray.500">No posts yet.</Text>
          )}
        </Stack>

        <CommunityMembers data={communityUserData} />
      </HStack>
    </Stack>
  );
};

export default CommunityPosts;
