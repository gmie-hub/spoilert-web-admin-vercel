import type { FC } from "react";

import { HStack, Spinner, Stack, Text } from "@chakra-ui/react";

import { useGetPostCommentsQuery } from "@spt/hooks/api/useGetPostCommentQuery";
import CommunityPostCard from "@spt/partials/communityPostCard";
import LikeAndComment from "@spt/partials/likeAndComment";
import type { CommunityPostDatum } from "@spt/types/community";

import { PostImages } from "./postImages";

interface CommunityPostThreadProps {
    post: CommunityPostDatum;
  }

export const CommunityPostThread: FC<CommunityPostThreadProps> = ({ post }) => {
    const { commentData, isCommentLoading, isCommentError, commentErrorMessage } =
      useGetPostCommentsQuery(post?.id);
  
    const hasComments = commentData.length > 0;
  
    return (
      <Stack gap="4">
        <CommunityPostCard
          content={post?.content ?? ""}
          createdAt={post?.created_at}
          extraContent={<PostImages images={post?.images} />}
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
  
        <Stack gap="3" pl={{ base: "0", md: "12" }}>
          {isCommentLoading ? (
            <Spinner size="sm" color="gray.500" />
          ) : isCommentError ? (
            <Text color="red.500" fontSize="sm">
              {commentErrorMessage}
            </Text>
          ) : hasComments ? (
            commentData.map((comment) => (
              <CommunityPostCard
                key={comment.id}
                content={comment.comment}
                createdAt={comment.created_at}
                cardProps={{ bg: "gray.50" }}
                stackProps={{ gap: "2" }}
              />
            ))
          ) : (
            <Text color="gray.500" fontSize="sm">
              No comments yet.
            </Text>
          )}
        </Stack>
      </Stack>
    );
  };