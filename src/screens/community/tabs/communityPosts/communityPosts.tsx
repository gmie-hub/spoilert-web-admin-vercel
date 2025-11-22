import type { FC } from "react";
import { useState } from "react";

import {
  Box,
  Dialog,
  Flex,
  HStack,
  Heading,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Back } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import { useDeletePostMutation } from "@spt/hooks/api/useDeletePostMutation";
import { useGetCommunityUsersQuery } from "@spt/hooks/api/useGetCommunityUsersQuery";
import { useLikePostMutation } from "@spt/hooks/api/useLikePostMutation";
import CommunityPostCard from "@spt/partials/communityPostCard";
import LikeAndComment from "@spt/partials/likeAndComment";
import { useDeleteStore } from "@spt/store";
import type {
  CommunitiesDatum,
  CommunityPostDatum,
} from "@spt/types/community";

import { CommunityMembers } from "./communityMembers";
import { CommunityPostThread } from "./communityPostThread";
import { PostImages } from "./postImages";
import { PostInput } from "./postInput";

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
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);

  const { communityUserData } = useGetCommunityUsersQuery(communityId);
  const { isDeleteLoading, deletePostHandler } = useDeletePostMutation();
  const { isLiking, likePostHandler } = useLikePostMutation();

  const selectedPost = postData.find((p) => p.id === selectedPostId);
  const editingPost = postData.find((p) => p.id === editingPostId);
  const deletingPost = postData.find((p) => p.id === deletePostId);

  const hasPosts = postData?.length > 0;

  const handleDeleteClick = (postId: number) => {
    setDeletePostId(postId);
    setIsDeleteOpen(true);
  };

  const handleDeletePost = () => {
    if (deletePostId !== null) {
      deletePostHandler(deletePostId);
    }
  };

  const handleStartEdit = (postId: number) => {
    setEditingPostId(postId);
    setSelectedPostId(null);
  };

  const handleEditComplete = () => {
    setEditingPostId(null);
  };

  return (
    <Stack>
      <Stack>
        {selectedPostId !== null && (
          <Box>
            <Back onClick={() => setSelectedPostId(null)} />
          </Box>
        )}

        <HStack>
          <Heading>{communityData?.name}</Heading>
        </HStack>

        <Text color="gray.500">{communityData?.total_members} Members</Text>
        <Text color="gray.500">{communityData?.description}</Text>
      </Stack>

      <Separator />

      <Stack gap="5">
        <Flex
          flexDir={{ base: "column-reverse", xl: "row" }}
          mt="3"
          gap="8"
          alignItems="flex-start"
        >
          <Stack gap="3" w={{ xl: "65%" }}>
            {selectedPostId !== null && selectedPost ? (
              <CommunityPostThread
                post={selectedPost}
                onDeleteClick={() => handleDeleteClick(deletingPost.id)}
              />
            ) : hasPosts ? (
              postData.map((post) => (
                <CommunityPostCard
                  key={post?.id}
                  content={post?.content ?? ""}
                  createdAt={post?.created_at}
                  extraContent={<PostImages images={post?.images} />}
                  authorName={`${post?.user?.first_name} ${post?.user?.last_name}`}
                  onDeleteClick={() => handleDeleteClick(post.id)}
                  onEditClick={() => handleStartEdit(post.id)}
                  actions={
                    <HStack gap="4">
                      <LikeAndComment
                        icon="/heart.svg"
                        filledIcon="/heart-filled.svg"
                        alt="like"
                        value={post.total_likes}
                        isLiked={!!post.has_liked}
                        onClick={() => likePostHandler(post.id)}
                        isLoading={isLiking}
                      />

                      <LikeAndComment
                        icon="/message-text.svg"
                        alt="comment"
                        value={post?.total_comments}
                      />
                    </HStack>
                  }
                  onClick={() => setSelectedPostId(post.id)}
                  showMenu={true}
                />
              ))
            ) : (
              <Text color="gray.500">No posts yet.</Text>
            )}
          </Stack>

          <Box w={{ base: "full", xl: "35%" }}>
            <CommunityMembers data={communityUserData} />
          </Box>
        </Flex>

        <Separator />

        <PostInput
          postId={selectedPostId || editingPostId}
          communityId={communityId}
          initialContent={editingPost?.content || ""}
          onEditComplete={handleEditComplete}
        />
      </Stack>

      <Dialog.Root
        open={isDeleteOpen}
        onOpenChange={(details) => setIsDeleteOpen(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <DeleteModalContent
              text="Post"
              handleClick={handleDeletePost}
              isLoading={isDeleteLoading}
              successMessage="Post deleted successfully!"
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default CommunityPosts;
