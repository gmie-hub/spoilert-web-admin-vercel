import type { ChangeEvent, FC } from "react";
import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  HStack,
  IconButton,
  Image,
  Popover,
  Portal,
  SimpleGrid,
  Textarea,
} from "@chakra-ui/react";

import { useCreateCommentMutation } from "@spt/hooks/api/useCreateCommentMutation";
import { useCreatePostMutation } from "@spt/hooks/api/useCreatePostMutation";
import { useUpdatePostMutation } from "@spt/hooks/api/useUpdatePostMutation";
import { EMOJIS } from "@spt/utils";

interface PostInputProps {
  communityId?: number;
  postId?: number;
  initialContent?: string;
  onEditComplete?: () => void;
}

export const PostInput: FC<PostInputProps> = ({
  communityId,
  postId,
  initialContent = "",
  onEditComplete,
}) => {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isCreateLoading, createPostHandler } = useCreatePostMutation();
  const { createComment, isLoading } = useCreateCommentMutation();
  const { isUpdateLoading, updatePostHandler } = useUpdatePostMutation(postId);

  useEffect(() => {
    if (postId && initialContent) {
      setContent(initialContent);
      // Focus and put cursor at the end
      setTimeout(() => {
        textareaRef.current?.focus();
        textareaRef.current?.setSelectionRange(
          initialContent.length,
          initialContent.length
        );
      }, 100);
    } else {
      setContent("");
    }
    setSelectedImages([]);
  }, [postId, initialContent]);

  const isEditing = !!postId && !!communityId;

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    if (isEditing) {
      await updatePostHandler({
        community_id: communityId!,
        content: content.trim(),
        files: selectedImages.length > 0 ? selectedImages : undefined,
      });

      onEditComplete?.();
    } else if (postId) {
      await createComment({ post_id: postId, comment: content.trim() });
      setContent("");
    } else {
      await createPostHandler({
        community_id: communityId!,
        content: content.trim(),
        files: selectedImages.length > 0 ? selectedImages : undefined,
      });

      setContent("");
      setSelectedImages([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setIsEmojiPickerOpen(false);
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p="4"
      boxShadow="0px 4px 40px 0px #1E1E1E12"
      mb="4"
    >
      <HStack gap="3" alignItems="flex-start">
        <Popover.Root
          open={isEmojiPickerOpen}
          onOpenChange={(details) => setIsEmojiPickerOpen(details.open)}
        >
          <Popover.Trigger asChild>
            <IconButton
              aria-label="Add emoji"
              variant="ghost"
              colorScheme="gray"
              size="sm"
              cursor="pointer"
            >
              <Image src="/emoji.svg" alt="emoji" />
            </IconButton>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner>
              <Popover.Content p="3" w="300px">
                <Popover.Arrow />
                <SimpleGrid columns={8} gap="2">
                  {EMOJIS.map((emoji, index) => (
                    <Box
                      key={index}
                      as="button"
                      fontSize="xl"
                      p="2"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: "gray.100" }}
                      onClick={() => handleEmojiClick(emoji)}
                      aria-label={`Add ${emoji} emoji`}
                    >
                      {emoji}
                    </Box>
                  ))}
                </SimpleGrid>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>

        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          placeholder="Write a post..."
          resize="none"
          rows={3}
          flex="1"
          bg="#FBFBFB"
          border="1px solid #EFEFEF"
          borderRadius="xl"
          fontSize="sm"
          _placeholder={{
            fontSize: "sm",
            fontWeight: "normal",
            color: "gray.400",
          }}
          _focus={{
            borderColor: "teal.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-teal-500)",
          }}
        />

        <Box position="relative">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <IconButton
            aria-label="Attach file"
            variant="ghost"
            colorScheme="gray"
            size="sm"
            onClick={handleAttachmentClick}
            cursor="pointer"
            _hover={{ backgroundColor: "transparent" }}
          >
            <Image src="/attachment.svg" alt="attach" />
          </IconButton>
        </Box>

        <IconButton
          aria-label="Send post"
          onClick={handleSubmit}
          loading={isLoading || isCreateLoading || isUpdateLoading}
          disabled={!content.trim() || isCreateLoading || isLoading}
          bg="#013B4D"
          color="white"
          borderRadius="full"
          size="sm"
          _hover={{
            bg: "teal.700",
          }}
          _disabled={{
            bg: "gray.300",
            cursor: "not-allowed",
          }}
        >
          <Image src="/send.svg" alt="send" />
        </IconButton>
      </HStack>

      {selectedImages.length > 0 && (
        <Box mt="2" fontSize="xs" color="gray.500">
          {selectedImages.length} image(s) selected
        </Box>
      )}
    </Box>
  );
};
