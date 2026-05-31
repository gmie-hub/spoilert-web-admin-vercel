import { Box, Image, Text, VStack } from "@chakra-ui/react";

import { useGetBestPerformingQuery } from "@spt/hooks/api/useGetBestPerformingQuery";

export default function CoursesSection() {
  const { data } = useGetBestPerformingQuery();

  const courses = (data?.overview ?? []).slice(0, 3);

  return (
    <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="md">
      <Text
        fontWeight="500"
        fontSize={{ base: "sm", md: "md" }}
        mb={4}
        color="var(--color-back)"
      >
        Top 3 Most Enrolled Spoils
      </Text>
      <VStack gap={4} width="100%">
        {courses.map((course) => (
          <Box
            key={course.spoil_id}
            display="flex"
            alignItems="center"
            gap={4}
            bg="gray.50"
            p={4}
            borderRadius="lg"
            width="100%"
            boxShadow="sm"
          >
            <Image
              src={course.cover_image ?? "/enrolled_spoils.png"}
              boxSize="53px"
              height="47px"
              bg="#EFEFEF"
              borderRadius="12px"
              objectFit="cover"
            />
            <Box>
              <Text fontWeight="500" fontSize="md" color="#212529">
                {course.spoil_name}
              </Text>
              <Text fontWeight="400" fontSize="12px" color="#666869">
                {course.total_enrollments.toLocaleString()} Enrollments
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
