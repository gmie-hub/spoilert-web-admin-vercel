import { type FC, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { HiX } from "react-icons/hi";
import { number, object, string } from "yup";

import { Input, Textarea } from "@spt/components";
import type { QuizDraft, QuizQuestionDraft } from "@spt/store/createSpolyzStore";

import QuestionModal from "./questionModal";
import QuizQuestionList from "./quizQuestionList";

export type QuizVariant = "pre" | "post" | "module";

const quizLabels: Record<QuizVariant, string> = {
  pre: "Pre-Spoylz Quiz",
  post: "Post-Spoylz Quiz",
  module: "Module Quiz",
};

interface QuizFormValues {
  title: string;
  description: string;
  no_of_questions: string;
  time_limit: string;
  pass_mark: string;
}

const numberField = (label: string, min: number, max: number) =>
  number()
    .transform((value, original) => (original === "" ? undefined : value))
    .typeError(`${label} must be a number`)
    .integer(`${label} must be a whole number`)
    .min(min, `${label} must be at least ${min}`)
    .max(max, `${label} cannot exceed ${max}`);

const buildValidationSchema = (variant: QuizVariant) =>
  object().shape({
    title: string().trim().required("Quiz title is required"),
    description: string().trim().required("Description is required"),
    no_of_questions: numberField("Number of questions", 1, 100).required(
      "Number of questions is required",
    ),
    time_limit: numberField("Time limit", 1, 600).required(
      "Time limit is required",
    ),
    pass_mark:
      variant === "post"
        ? numberField("Passmark", 0, 100).required(
            "Passmark is required for post-Spoylz quiz",
          )
        : string(),
  });

interface QuizModalProps {
  open: boolean;
  variant: QuizVariant;
  /** Shown in the header for module quizzes. */
  moduleTitle?: string;
  initialQuiz?: QuizDraft | null;
  onOpenChange: (open: boolean) => void;
  onSave: (quiz: QuizDraft) => void;
  onRemove?: () => void;
}

const QuizModal: FC<QuizModalProps> = ({
  open,
  variant,
  moduleTitle,
  initialQuiz,
  onOpenChange,
  onSave,
  onRemove,
}) => {
  const [questions, setQuestions] = useState<QuizQuestionDraft[]>(
    initialQuiz?.questions ?? [],
  );
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] =
    useState<QuizQuestionDraft | null>(null);
  const [questionsError, setQuestionsError] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setQuestions(initialQuiz?.questions ?? []);
      setQuestionsError(undefined);
    }
  }, [open, initialQuiz]);

  const initialValues: QuizFormValues = {
    title: initialQuiz?.title ?? "",
    description: initialQuiz?.description ?? "",
    no_of_questions: initialQuiz?.no_of_questions ?? "",
    time_limit: initialQuiz?.time_limit ?? "",
    pass_mark: initialQuiz?.pass_mark ?? "",
  };

  const handleSaveQuestion = (question: QuizQuestionDraft) => {
    setQuestions((prev) => {
      const exists = prev.some((item) => item.id === question.id);
      return exists
        ? prev.map((item) => (item.id === question.id ? question : item))
        : [...prev, question];
    });
    setQuestionsError(undefined);
    setEditingQuestion(null);
  };

  const heading =
    variant === "module" && moduleTitle
      ? `${quizLabels.module} — ${moduleTitle}`
      : quizLabels[variant];

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(d) => onOpenChange(d.open)}
        placement="center"
        motionPreset="slide-in-bottom"
        size="lg"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl" maxW="620px" mx="4">
              <Stack gap="6" p="6" maxH="85vh" overflowY="auto">
                <Flex align="center" justify="space-between" gap="3">
                  <Text fontSize="lg" fontWeight="semibold">
                    {heading}
                  </Text>
                  <IconButton
                    aria-label="Close"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    borderColor="#E0E0E0"
                    onClick={() => onOpenChange(false)}
                  >
                    <HiX size={16} />
                  </IconButton>
                </Flex>

                <Formik<QuizFormValues>
                  initialValues={initialValues}
                  validationSchema={buildValidationSchema(variant)}
                  enableReinitialize
                  onSubmit={(values) => {
                    if (questions.length === 0) {
                      setQuestionsError("Add at least one question");
                      return;
                    }

                    onSave({
                      title: values.title.trim(),
                      description: values.description.trim(),
                      no_of_questions: values.no_of_questions,
                      time_limit: values.time_limit,
                      pass_mark: variant === "post" ? values.pass_mark : "",
                      questions,
                    });

                    onOpenChange(false);
                  }}
                >
                  {() => (
                    <Form>
                      <Stack gap="5">
                        <Input
                          name="title"
                          label="Quiz Title"
                          placeholder="Enter a title for your quiz"
                        />

                        <Textarea
                          name="description"
                          label="Description"
                          placeholder="Write a short description for learners"
                        />

                        <Input
                          name="no_of_questions"
                          label="Number of Questions"
                          placeholder="How many questions?"
                          type="number"
                        />

                        <Input
                          name="time_limit"
                          label="Time Limit (minutes)"
                          placeholder="Set time limit for the whole quiz"
                          type="number"
                        />

                        {variant === "post" && (
                          <Input
                            name="pass_mark"
                            label="Passmark"
                            placeholder="Enter passmark (e.g. 50)"
                            type="number"
                          />
                        )}

                        <QuizQuestionList
                          questions={questions}
                          error={questionsError}
                          onAdd={() => {
                            setEditingQuestion(null);
                            setQuestionModalOpen(true);
                          }}
                          onEdit={(question) => {
                            setEditingQuestion(question);
                            setQuestionModalOpen(true);
                          }}
                          onRemove={(questionId) =>
                            setQuestions((prev) =>
                              prev.filter((item) => item.id !== questionId),
                            )
                          }
                        />

                        <Stack gap="3">
                          <Button variant="yellow" type="submit" w="full">
                            Save Quiz
                          </Button>

                          {onRemove && initialQuiz && (
                            <Button
                              variant="ghost"
                              color="red.500"
                              w="full"
                              onClick={() => {
                                onRemove();
                                onOpenChange(false);
                              }}
                            >
                              Remove Quiz
                            </Button>
                          )}
                        </Stack>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Stack>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <QuestionModal
        open={questionModalOpen}
        onOpenChange={(isOpen) => {
          setQuestionModalOpen(isOpen);
          if (!isOpen) setEditingQuestion(null);
        }}
        editingQuestion={editingQuestion}
        onSave={handleSaveQuestion}
      />
    </>
  );
};

export default QuizModal;
