import { type FC } from "react";

import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";

import type { AdvancedModuleDraft } from "@spt/store/createSpolyzStore";

import { formatQuizSummary } from "./quizSummary";

interface OutlineModuleCardProps {
  module: AdvancedModuleDraft;
  index: number;
  onAddLesson: () => void;
  onOpenQuiz: () => void;
}

const OutlineModuleCard: FC<OutlineModuleCardProps> = ({
  module,
  index,
  onAddLesson,
  onOpenQuiz,
}) => {
  return (
    <Box border="1px solid #EFEFEF" borderRadius="xl" p="4" bg="white">
      <Flex align="center" justify="space-between" gap="3" mb="3">
        <Stack gap="0">
          <Text fontSize="sm" fontWeight="semibold">
            Module {index + 1}: {module.title}
          </Text>
          <Text fontSize="xs" color="gray.500">
            {module.description}
          </Text>
        </Stack>

        <HStack gap="2" flexShrink={0}>
          <Button variant="yellowOutline" size="sm" py="2" onClick={onOpenQuiz}>
            <HStack gap="1">
              {!module.quiz && <HiOutlinePlus size={16} />}
              <Text>{module.quiz ? "Edit Quiz" : "Add Quiz"}</Text>
            </HStack>
          </Button>

          <Button variant="yellowOutline" size="sm" py="2" onClick={onAddLesson}>
            <HStack gap="1">
              <HiOutlinePlus size={16} />
              <Text>Add Lesson</Text>
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {module.lessons.length > 0 && (
        <Stack gap="2" pl="2">
          {module.lessons.map((lesson, lessonIndex) => (
            <Flex
              key={lesson.id}
              align="center"
              justify="space-between"
              borderTop="1px solid #F4F4F4"
              pt="2"
            >
              <Stack gap="0">
                <Text fontSize="sm" fontWeight="medium">
                  Lesson {lessonIndex + 1}: {lesson.title}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {lesson.type === "file" && lesson.content_file
                    ? `File · ${lesson.content_file.name}`
                    : lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
                </Text>
              </Stack>
            </Flex>
          ))}
        </Stack>
      )}

      {module.quiz && (
        <Flex
          align="center"
          justify="space-between"
          borderTop="1px solid #F4F4F4"
          mt="2"
          pt="2"
          pl="2"
        >
          <Stack gap="0">
            <Text fontSize="sm" fontWeight="medium">
              Quiz: {module.quiz.title}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formatQuizSummary(module.quiz)}
            </Text>
          </Stack>
        </Flex>
      )}
    </Box>
  );
};

export default OutlineModuleCard;
