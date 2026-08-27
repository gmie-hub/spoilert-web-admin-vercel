import { type FC, useState } from "react";

import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";

import { NoData } from "@spt/components";
import type { QuizQuestionDraft } from "@spt/store/createSpolyzStore";

import QuestionModal from "../../createAdvancedSpolyz/components/questionModal";

import QuizQuestionOutlineList from "./quizQuestionOutlineList";

interface QuizQuestionsStepProps {
  title: string;
  questions: QuizQuestionDraft[];
  onChange: (questions: QuizQuestionDraft[]) => void;
  onContinue: () => void;
  onPrevious: () => void;
}

const QuizQuestionsStep: FC<QuizQuestionsStepProps> = ({
  title,
  questions,
  onChange,
  onContinue,
  onPrevious,
}) => {
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<QuizQuestionDraft | null>(null);
  const [error, setError] = useState<string | undefined>();

  const hasQuestions = questions.length > 0;

  const openAddModal = () => {
    setEditingQuestion(null);
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = (question: QuizQuestionDraft) => {
    const exists = questions.some((item) => item.id === question.id);
    onChange(
      exists
        ? questions.map((item) => (item.id === question.id ? question : item))
        : [...questions, question],
    );
    setError(undefined);
    setEditingQuestion(null);
  };

  const handleContinue = () => {
    if (questions.length === 0) {
      setError("Add at least one question");
      return;
    }

    onContinue();
  };

  return (
    <>
      <Stack gap="6">
        <Flex align="center" justify="space-between" gap="3">
          <Text fontSize="md" fontWeight="semibold">
            {hasQuestions ? title : "Add Questions"}
          </Text>

          {hasQuestions && (
            <Button variant="yellow" size="sm" py="2" onClick={openAddModal}>
              <HStack gap="1">
                <HiOutlinePlus size={14} />
                <Text color="white">Add Question</Text>
              </HStack>
            </Button>
          )}
        </Flex>

        {!hasQuestions ? (
          <Stack gap="6">
            <NoData
              heading="No Question Has Been Added Yet"
              description="Add questions to create your quiz"
            />

            <Button variant="yellow" w="full" onClick={openAddModal}>
              Add Questions
            </Button>
          </Stack>
        ) : (
          <QuizQuestionOutlineList
            questions={questions}
            onEdit={(question) => {
              setEditingQuestion(question);
              setQuestionModalOpen(true);
            }}
            onRemove={(questionId) =>
              onChange(questions.filter((item) => item.id !== questionId))
            }
          />
        )}

        {error && (
          <Text fontSize="sm" color="red.500">
            {error}
          </Text>
        )}

        {hasQuestions && (
          <Stack gap="3">
            <Button variant="yellow" w="full" onClick={handleContinue}>
              Save And Continue
            </Button>
          </Stack>
        )}

        <Button variant="yellowOutline" w="full" onClick={onPrevious}>
          Previous
        </Button>
      </Stack>

      <QuestionModal
        open={questionModalOpen}
        onOpenChange={(open) => {
          setQuestionModalOpen(open);
          if (!open) setEditingQuestion(null);
        }}
        editingQuestion={editingQuestion}
        onSave={handleSaveQuestion}
      />
    </>
  );
};

export default QuizQuestionsStep;
