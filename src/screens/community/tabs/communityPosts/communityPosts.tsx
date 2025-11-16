import type { FC } from "react";

import { Box, HStack, Heading, Separator, Stack, Text } from "@chakra-ui/react";

import { Back } from "@spt/components";
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
      <Stack>
        <Box>
          <Back onClick={() => {}} />
        </Box>

        <HStack>
          <Heading>{communityData?.name}</Heading>
        </HStack>

        <Text color="gray.500">{communityData?.total_members} Members</Text>
        <Text color="gray.500">{communityData?.description}</Text>
      </Stack>

      <Separator />

      <HStack mt="3" gap="8" alignItems="flex-start">
        <Stack gap="3" w={{ md: "65%" }}>
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
