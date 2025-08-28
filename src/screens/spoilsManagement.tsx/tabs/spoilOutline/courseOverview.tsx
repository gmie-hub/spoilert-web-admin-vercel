import type { FC } from "react";

import { Box, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react";
import ReactPlayer from "react-player";

import { useVideoStore } from "@spt/store/videoStore";
import type { SpoilData } from "@spt/types/spoils";

interface ComponentProps {
  data?: SpoilData;
}

const CourseOverview: FC<ComponentProps> = ({ data }) => {
  const videoUrl = useVideoStore((state) => state.videoUrl);

  return (
    <Stack gap="4" w="100%">
      {/* <Image src="video-banner.png" alt="banner" /> */}

      <Box
        position="relative"
        pt="56.25%"
        borderRadius="lg"
        overflow="hidden"
        width="100%"
        height="100%"
      >
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: "0", left: "0" }}
          controls
          playing
        />
      </Box>

      <Stack gap="3" mt="2">
        <Text fontSize="lg" fontWeight="semibold">
          {data?.title}
        </Text>
        <Text fontWeight="medium">Overview</Text>
      </Stack>

      <Stack gap="1">
        <Box>
          <Tag.Root
            variant="outline"
            colorPalette="gray"
            py="2"
            borderRadius="lg"
          >
            <Tag.Label color="gray.600">{data?.category?.name}</Tag.Label>
          </Tag.Root>
        </Box>

        <HStack gap="1">
          <Image src="/user-icon.svg" alt="user" />
          <Text color="gray.500" as="u">
            {`${data?.tutor?.first_name} ${data?.tutor?.last_name}`}
          </Text>
        </HStack>
      </Stack>

      <Text color="gray">{data?.description}</Text>

      <Stack>
        <Text fontWeight="medium">What you will learn</Text>

        <Stack gap="4">
          {data?.what_to_tearn?.split(",")?.map((item, index) => (
            <HStack
              key={index}
              alignItems={{ base: "flex-start", md: "center" }}
            >
              <Image src="/tri-bullet.svg" alt="bullet" />
              <Text color="gray">{item}</Text>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseOverview;