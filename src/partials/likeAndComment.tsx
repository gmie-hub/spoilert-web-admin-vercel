import type { FC } from "react";

import { HStack, Image, Text } from "@chakra-ui/react";

interface LikeAndCommentProps {
  icon: string;
  alt: string;
  value: number;
}

const LikeAndComment: FC<LikeAndCommentProps> = ({ icon, alt, value }) => {
  return (
    <HStack gap="1" alignItems="center">
      <Image src={icon} alt={alt} boxSize="5" />
      <Text>{value}</Text>
    </HStack>
  );
};

export default LikeAndComment;