import type { FC } from "react";

import {
  Dialog,
  HStack,
  Heading,
  Portal,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import DeleteModalContent from "@spt/components/deleteModalContent";
import { useDeletePostMutation } from "@spt/hooks/api/useDeletePostMutation";
import { useGetPostCommentsQuery } from "@spt/hooks/api/useGetPostCommentQuery";
import CommunityPostCard from "@spt/partials/communityPostCard";
import LikeAndComment from "@spt/partials/likeAndComment";
import { useDeleteStore } from "@spt/store";
import type { CommunityPostDatum } from "@spt/types/community";

import { PostImages } from "./postImages";

interface CommunityPostThreadProps {
  post: CommunityPostDatum;
}

export const CommunityPostThread: FC<CommunityPostThreadProps> = ({ post }) => {
  const { commentData, isCommentLoading, isCommentError, commentErrorMessage } =
    useGetPostCommentsQuery(post?.id);
  const openDelete = useDeleteStore((state) => state.openDelete);
  const setOpenDelete = useDeleteStore((state) => state.setOpenDelete);
  const { isDeleteLoading, deletePostHandler } = useDeletePostMutation();

  const hasComments = commentData.length > 0;

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleDeletePost = () => {
    if (post?.id) {
      deletePostHandler(post.id);
    }
  };

  return (
    <>
      <Stack gap="3">
        <CommunityPostCard
          content={post?.content ?? ""}
          createdAt={post?.created_at}
          extraContent={<PostImages images={post?.images} />}
          authorName={`${post?.user?.first_name} ${post?.user?.last_name}`}
          onDeleteClick={handleDeleteClick}
          actions={
            <HStack gap="4">
              <LikeAndComment
                icon="/heart.svg"
                alt="like"
                value={post?.total_likes}
              />

              <LikeAndComment
                icon="/message-text.svg"
                alt="comment"
                value={post?.total_comments}
              />
            </HStack>
          }
        />

        {hasComments && <Heading>Comments</Heading>}

        <Stack gap="3" pl={{ base: "0", md: "12" }}>
          {isCommentLoading ? (
            <Spinner size="sm" color="gray.500" />
          ) : isCommentError ? (
            <Text color="red.500" fontSize="sm">
              {commentErrorMessage}
            </Text>
          ) : (
            hasComments &&
            commentData.map((comment) => (
              <CommunityPostCard
                key={comment.id}
                content={comment.comment}
                createdAt={comment.created_at}
                cardProps={{ bg: "gray.50" }}
                stackProps={{ gap: "2" }}
                authorName={`${comment?.user?.first_name} ${comment?.user?.last_name}`}
                showMenu={false}
              />
            ))
          )}
        </Stack>
      </Stack>

      <Dialog.Root
        open={openDelete}
        onOpenChange={(details) => setOpenDelete(details.open)}
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
    </>
  );
};
