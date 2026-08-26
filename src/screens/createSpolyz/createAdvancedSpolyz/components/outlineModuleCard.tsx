import { type FC, useState } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HiChevronDown,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlinePencil,
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi";

import type {
  AdvancedLessonDraft,
  AdvancedModuleDraft,
} from "@spt/store/createSpolyzStore";

import { formatQuizSummary } from "./quizSummary";

interface OutlineModuleCardProps {
  module: AdvancedModuleDraft;
  index: number;
  onAddLesson: () => void;
  onOpenQuiz: () => void;
  onEditModule: () => void;
  onDeleteModule: () => void;
  onEditLesson: (lesson: AdvancedLessonDraft) => void;
  onDeleteLesson: (lesson: AdvancedLessonDraft) => void;
}

const OutlineModuleCard: FC<OutlineModuleCardProps> = ({
  module,
  index,
  onAddLesson,
  onOpenQuiz,
  onEditModule,
  onDeleteModule,
  onEditLesson,
  onDeleteLesson,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const lessonCount = module.lessons.length;
  const hasOutline = lessonCount > 0 || Boolean(module.quiz);

  return (
    <Box
      border="1px solid #EFEFEF"
      borderRadius="xl"
      bg="white"
      overflow="hidden"
    >
      <Flex align="flex-start" justify="space-between" gap="3" p="4">
        <Stack gap="1" minW="0">
          <Text fontSize="sm" color="gray.100">
            Module {index + 1}
          </Text>

          <Text fontSize="md" fontWeight="semibold" color="dark">
            {module.title}
          </Text>

          {!isOpen && (
            <Text fontSize="xs" color="gray.500">
              {lessonCount} {lessonCount === 1 ? "Lesson" : "Lessons"}
              {module.quiz ? " · Quiz added" : ""}
            </Text>
          )}
        </Stack>

        <HStack gap="1" flexShrink={0}>
          <IconButton
            aria-label={`Delete module ${index + 1}`}
            variant="ghost"
            size="sm"
            color="red.500"
            onClick={onDeleteModule}
          >
            <HiOutlineTrash size={18} />
          </IconButton>

          <IconButton
            aria-label={`Edit module ${index + 1}`}
            variant="ghost"
            size="sm"
            color="gray.500"
            onClick={onEditModule}
          >
            <HiOutlinePencil size={18} />
          </IconButton>

          <IconButton
            aria-label={
              isOpen
                ? `Collapse module ${index + 1}`
                : `Expand module ${index + 1}`
            }
            aria-expanded={isOpen}
            variant="ghost"
            size="sm"
            color="gray.500"
            onClick={() => setIsOpen((open) => !open)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex" }}
            >
              <HiChevronDown size={18} />
            </motion.div>
          </IconButton>
        </HStack>
      </Flex>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`module-${module.id}-body`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Stack gap="3" px="4" pb="4">
              {module.description && (
                <Text fontSize="sm" color="gray.500">
                  {module.description}
                </Text>
              )}

              <HStack gap="3" wrap="wrap">
                <Button
                  variant="yellowOutline"
                  size="sm"
                  px="4"
                  py="2"
                  fontSize="sm"
                  onClick={onAddLesson}
                >
                  <HStack gap="2">
                    <HiOutlinePlus size={16} />
                    <Text>Add Lesson</Text>
                  </HStack>
                </Button>

                <Button
                  variant="yellowOutline"
                  size="sm"
                  px="4"
                  py="2"
                  fontSize="sm"
                  onClick={onOpenQuiz}
                >
                  <HStack gap="2">
                    {!module.quiz && <HiOutlinePlus size={16} />}
                    <Text>{module.quiz ? "Edit Quiz" : "Create Quiz"}</Text>
                  </HStack>
                </Button>
              </HStack>

              {!hasOutline && (
                <Text fontSize="sm" color="gray.100">
                  No lesson has been added to this module yet.
                </Text>
              )}
            </Stack>

            {hasOutline && (
              <Stack gap="0" borderTop="1px solid #EFEFEF" bg="#FBFBFB">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Flex
                    key={lesson.id}
                    align="center"
                    justify="space-between"
                    gap="3"
                    px="4"
                    py="3"
                    borderTop={lessonIndex > 0 ? "1px solid #EFEFEF" : undefined}
                  >
                    <HStack gap="3" minW="0">
                      <Box color="gray.100" flexShrink={0} display="flex">
                        {lesson.type === "file" ? (
                          <HiOutlinePlay size={18} />
                        ) : (
                          <HiOutlineDocumentText size={18} />
                        )}
                      </Box>

                      <Text fontSize="sm" color="dark" truncate>
                        {lesson.title}
                      </Text>
                    </HStack>

                    <HStack gap="1" flexShrink={0}>
                      <IconButton
                        aria-label={`Delete lesson ${lesson.title}`}
                        variant="ghost"
                        size="sm"
                        color="red.500"
                        onClick={() => onDeleteLesson(lesson)}
                      >
                        <HiOutlineTrash size={18} />
                      </IconButton>

                      <IconButton
                        aria-label={`Edit lesson ${lesson.title}`}
                        variant="ghost"
                        size="sm"
                        color="gray.500"
                        onClick={() => onEditLesson(lesson)}
                      >
                        <HiOutlinePencil size={18} />
                      </IconButton>
                    </HStack>
                  </Flex>
                ))}

                {module.quiz && (
                  <Flex
                    align="center"
                    justify="space-between"
                    gap="3"
                    px="4"
                    py="3"
                    borderTop={lessonCount > 0 ? "1px solid #EFEFEF" : undefined}
                  >
                    <HStack gap="3" minW="0">
                      <Box color="gray.100" flexShrink={0} display="flex">
                        <HiOutlineClipboardCheck size={18} />
                      </Box>

                      <Stack gap="0" minW="0">
                        <Text fontSize="sm" color="dark" truncate>
                          {module.quiz.title}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                          {formatQuizSummary(module.quiz)}
                        </Text>
                      </Stack>
                    </HStack>

                    <IconButton
                      aria-label={`Edit module ${index + 1} quiz`}
                      variant="ghost"
                      size="sm"
                      color="gray.500"
                      onClick={onOpenQuiz}
                    >
                      <HiOutlinePencil size={18} />
                    </IconButton>
                  </Flex>
                )}
              </Stack>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default OutlineModuleCard;
