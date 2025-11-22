import type { FC } from "react";

import { HStack, Heading, Spinner, Stack, Text } from "@chakra-ui/react";

import { useGetPostCommentsQuery } from "@spt/hooks/api/useGetPostCommentQuery";
import { useLikePostMutation } from "@spt/hooks/api/useLikePostMutation";
import CommunityPostCard from "@spt/partials/communityPostCard";
import LikeAndComment from "@spt/partials/likeAndComment";
import type { CommunityPostDatum } from "@spt/types/community";

import { PostImages } from "./postImages";

interface CommunityPostThreadProps {
  post: CommunityPostDatum;
  onDeleteClick?: () => void;
}

export const CommunityPostThread: FC<CommunityPostThreadProps> = ({
  post,
  onDeleteClick,
}) => {
  const { commentData, isCommentLoading, isCommentError, commentErrorMessage } =
    useGetPostCommentsQuery(post?.id);
  const { isLiking, likePostHandler } = useLikePostMutation();

  const hasComments = commentData.length > 0;

  return (
    <Stack gap="3">
      <CommunityPostCard
        content={post?.content ?? ""}
        createdAt={post?.created_at}
        extraContent={<PostImages images={post?.images} />}
        authorName={`${post?.user?.first_name} ${post?.user?.last_name}`}
        onDeleteClick={onDeleteClick}
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
      />

      {hasComments && <Heading>Comments</Heading>}

      <Stack gap="3">
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
  );
};
