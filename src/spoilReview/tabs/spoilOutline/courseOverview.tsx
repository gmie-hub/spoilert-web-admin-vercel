import { Box, HStack, Image, Stack, Tag, Text } from "@chakra-ui/react";

import { courseOverviewData } from "@spt/utils/spoilData";

const CourseOverview = () => {
  return (
    <Stack gap="4">
      <Image src="video-banner.png" alt="banner" />

      <Stack gap="3" mt="2">
        <Text fontSize="lg" fontWeight="semibold">
          What are Design Principles
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
            <Tag.Label color="gray.600">UI/UX Design</Tag.Label>
          </Tag.Root>
        </Box>

        <HStack gap="1">
          <Image src="/user-icon.svg" alt="user" />
          <Text color="gray.500" as="u">
            Ogunsola Omorinsola
          </Text>
        </HStack>
      </Stack>

      <Text color="gray">
        Understanding Design Principles" is a comprehensive Spoil that takes you
        through the foundational concepts of creating effective and visually
        appealing designs. Whether you’re a beginner looking to step into the
        design world or a professional aiming to polish your skills, this Spoil
        has something for everyone. You’ll explore core design principles,
        including balance, contrast, hierarchy, and more, with real-world
        examples and actionable tips.{" "}
      </Text>

      <Stack>
        <Text fontWeight="medium">What you will learn</Text>

        <Stack gap="4">
          {courseOverviewData.map((item) => (
            <HStack
              key={item.id}
              alignItems={{ base: "flex-start",  md: "center" }}
            >
              <Image src="/tri-bullet.svg" alt="bullet" />
              <Text color="gray">{item.name}</Text>
            </HStack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CourseOverview;
