import type { FC } from "react";

import { Image, SimpleGrid } from "@chakra-ui/react";

import type { CommunityPostDatum } from "@spt/types/community";

interface PostImagesProps {
  images?: CommunityPostDatum["images"];
}

export const PostImages: FC<PostImagesProps> = ({ images }) => {
  const sanitizedImages = Array.isArray(images)
    ? images
        .map((image) => {
          if (typeof image === "string") return image;
          if (image && typeof image === "object") {
            if (typeof (image as { url?: unknown }).url === "string") {
              return (image as { url: string }).url;
            }

            if (
              typeof (image as { image_url?: unknown }).image_url === "string"
            ) {
              return (image as { image_url: string }).image_url;
            }

            if (typeof (image as { src?: unknown }).src === "string") {
              return (image as { src: string }).src;
            }

            if (typeof (image as { path?: unknown }).path === "string") {
              return (image as { path: string }).path;
            }
          }

          return null;
        })
        .filter((src): src is string => Boolean(src))
    : [];

  if (sanitizedImages.length === 0) {
    return null;
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap="3">
      {sanitizedImages.map((src, index) => (
        <Image
          key={`${src}-${index}`}
          src={src}
          alt={`community-post-image-${index + 1}`}
          borderRadius="lg"
          objectFit="cover"
          w="100%"
          maxH="200px"
        />
      ))}
    </SimpleGrid>
  );
};
