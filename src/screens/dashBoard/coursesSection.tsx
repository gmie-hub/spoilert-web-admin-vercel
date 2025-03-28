import { Box, Image, Text, VStack } from "@chakra-ui/react";

const courses = [
  {
    title: "Understanding Design Principles",
    enrollments: "1,500 Enrollments",
    image: "/path-to-image1.jpg",
  },
  {
    title: "Financial Literacy",
    enrollments: "1,200 Enrollments",
    image: "/path-to-image2.jpg",
  },
  {
    title: "CHM204-Pharmacological Biochemistry",
    enrollments: "1,000 Enrollments",
    image: "/path-to-image3.jpg",
  },
];

export default function CoursesSection() {
  return (
    <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="md">

      <Text fontWeight="500" fontSize={{ base: "sm", md: "md" }} mb={4} color="var(--color-back)">
        Top 3 Most Enrolled Spoils
      </Text>
      <VStack gap={4} width="100%">
        {courses?.map((course, index) => (
          <Box
            key={index}
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
              src={course.image}
              boxSize="53px"
              height="47px"
              bg="#EFEFEF"
              borderRadius="12px"
            />
            <Box>
              <Text fontWeight="500" fontSize="md" color="#212529">
                {course.title}
              </Text>
              <Text fontWeight="400" fontSize="12px" color="#666869">
                {course.enrollments}
              </Text>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
