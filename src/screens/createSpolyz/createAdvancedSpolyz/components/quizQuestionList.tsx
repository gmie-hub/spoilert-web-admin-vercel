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
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

import { DeleteDialog } from "@spt/components";
import type { QuizQuestionDraft } from "@spt/store/createSpolyzStore";

const questionTypeLabel = (question: QuizQuestionDraft) =>
  question.type === "multiple_choice"
    ? "Multiple choice question"
    : "Fill in the blank question";

interface QuizQuestionListProps {
  questions: QuizQuestionDraft[];
  error?: string;
  onAdd: () => void;
  onEdit: (question: QuizQuestionDraft) => void;
  onRemove: (questionId: string) => void;
}

const QuizQuestionList: FC<QuizQuestionListProps> = ({
  questions,
  error,
  onAdd,
  onEdit,
  onRemove,
}) => {
  const [pendingQuestion, setPendingQuestion] =
    useState<QuizQuestionDraft | null>(null);

  return (
    <Stack gap="3">
      <Flex align="center" justify="space-between" gap="3">
        <Text fontSize="md" fontWeight="medium">
          Questions ({questions.length})
        </Text>

        <Button variant="yellowOutline" size="sm" py="2" onClick={onAdd}>
          <HStack gap="1">
            <HiOutlinePlus size={14} />
            <Text>Add Question</Text>
          </HStack>
        </Button>
      </Flex>

      {questions.length === 0 ? (
        <Box
          border="1px dashed #E0E0E0"
          borderRadius="xl"
          bg="#FBFBFB"
          py="6"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.500">
            No question has been added yet.
          </Text>
        </Box>
      ) : (
        <Stack gap="2">
          {questions.map((question, index) => (
            <Flex
              key={question.id}
              align="center"
              justify="space-between"
              gap="3"
              border="1px solid #EFEFEF"
              borderRadius="xl"
              bg="#FBFBFB"
              px="4"
              py="3"
            >
              <Stack gap="0" flex="1" minW="0">
                <Text fontSize="sm" fontWeight="medium" truncate>
                  {index + 1}. {question.prompt}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {questionTypeLabel(question)}
                </Text>
              </Stack>

              <HStack gap="2" flexShrink={0}>
                <Button
                  variant="ghost"
                  size="sm"
                  color="blue.100"
                  onClick={() => onEdit(question)}
                >
                  Edit
                </Button>

                <IconButton
                  aria-label="Remove question"
                  variant="outline"
                  size="sm"
                  borderRadius="full"
                  borderColor="#E0E0E0"
                  onClick={() => setPendingQuestion(question)}
                >
                  <HiOutlineTrash size={14} />
                </IconButton>
              </HStack>
            </Flex>
          ))}
        </Stack>
      )}

      {error && (
        <Text fontSize="sm" color="red.500">
          {error}
        </Text>
      )}

      <DeleteDialog
        open={Boolean(pendingQuestion)}
        itemName="Question"
        onOpenChange={(open) => {
          if (!open) setPendingQuestion(null);
        }}
        onConfirm={() => {
          if (pendingQuestion) onRemove(pendingQuestion.id);
          setPendingQuestion(null);
        }}
      />
    </Stack>
  );
};

export default QuizQuestionList;
