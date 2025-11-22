import type React from "react";

import { HStack, Image, Text } from "@chakra-ui/react";

interface LikeAndCommentProps {
  icon: string;
  filledIcon?: string;
  alt: string;
  value: number;
  isLiked?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
}

const LikeAndComment = ({
  icon,
  filledIcon,
  alt,
  value,
  isLiked = false,
  onClick,
  isLoading = false,
}: LikeAndCommentProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    onClick?.();
  };

  return (
    <HStack
      gap="1"
      alignItems="center"
      onClick={isLoading ? undefined : handleClick}
      cursor={isLoading ? "not-allowed" : onClick ? "pointer" : "default"}
      opacity={isLoading ? 0.6 : 1}
    >
      <Image
        src={isLiked && filledIcon ? filledIcon : icon}
        alt={alt}
        boxSize="5"
      />
      <Text
        color={isLiked ? "red.500" : "inherit"}
        fontWeight={isLiked ? "bold" : "normal"}
      >
        {value}
      </Text>
    </HStack>
  );
};

export default LikeAndComment;
