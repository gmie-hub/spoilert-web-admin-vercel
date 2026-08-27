import { type FC, useState } from "react";

import {
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { DeleteDialog } from "@spt/components";
import type { QuizQuestionDraft } from "@spt/store/createSpolyzStore";

const questionTypeLabel = (question: QuizQuestionDraft) =>
  question.type === "multiple_choice"
    ? "Multiple choice question"
    : "Fill in the blank question";

interface QuizQuestionOutlineListProps {
  questions: QuizQuestionDraft[];
  readOnly?: boolean;
  onEdit: (question: QuizQuestionDraft) => void;
  onRemove: (questionId: string) => void;
}

const QuizQuestionOutlineList: FC<QuizQuestionOutlineListProps> = ({
  questions,
  readOnly = false,
  onEdit,
  onRemove,
}) => {
  const [pendingQuestion, setPendingQuestion] =
    useState<QuizQuestionDraft | null>(null);

  return (
    <Stack gap="0">
      {questions.map((question, index) => (
        <Flex
          key={question.id}
          align="center"
          justify="space-between"
          gap="4"
          py="4"
          borderTop={index > 0 ? "1px solid #EFEFEF" : undefined}
        >
          <Stack gap="1" flex="1" minW="0">
            <Text fontSize="sm" fontWeight="medium">
              Q{index + 1}. {question.prompt}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {questionTypeLabel(question)}
            </Text>
          </Stack>

          {!readOnly && (
            <HStack gap="2" flexShrink={0}>
              <IconButton
                aria-label="Edit question"
                variant="ghost"
                size="sm"
                color="gray.500"
                onClick={() => onEdit(question)}
              >
                <HiOutlinePencil size={18} />
              </IconButton>

              <IconButton
                aria-label="Remove question"
                variant="ghost"
                size="sm"
                color="red.500"
                onClick={() => setPendingQuestion(question)}
              >
                <HiOutlineTrash size={18} />
              </IconButton>
            </HStack>
          )}
        </Flex>
      ))}

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

export default QuizQuestionOutlineList;
