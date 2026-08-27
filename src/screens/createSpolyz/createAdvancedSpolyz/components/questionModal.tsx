import { type FC } from "react";

import {
  Box,
  Button,
  Dialog,
  Flex,
  HStack,
  IconButton,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, useFormikContext } from "formik";
import { HiX } from "react-icons/hi";
import { array, mixed, object, string } from "yup";

import { Select, Textarea } from "@spt/components";
import {
  type QuizOptionDraft,
  type QuizQuestionDraft,
  type QuizQuestionType,
  createId,
} from "@spt/store/createSpolyzStore";

import { MAX_OPTIONS, MIN_OPTIONS, createEmptyOption } from "./questionOptions";
import QuestionOptionsEditor from "./questionOptionsEditor";

const questionTypeOptions = [
  { value: "multiple_choice", label: "Multiple Choice Questions" },
  { value: "fill_in_the_blank", label: "Fill in the Blank" },
];

interface QuestionFormValues {
  prompt: string;
  type: QuizQuestionType | "";
  answer: string;
  options: QuizOptionDraft[];
}

const validationSchema = object().shape({
  type: mixed<QuizQuestionType>()
    .oneOf(["multiple_choice", "fill_in_the_blank"], "Select a question type")
    .required("Select a question type"),
  prompt: string().trim().required("Question is required"),
  answer: string().when("type", {
    is: "fill_in_the_blank",
    then: (schema) => schema.trim().required("Answer is required"),
    otherwise: (schema) => schema,
  }),
  options: array().when("type", {
    is: "multiple_choice",
    then: () =>
      array()
        .of(
          object().shape({
            text: string().trim().required("Every option must have text"),
          }),
        )
        .min(MIN_OPTIONS, "Add at least 2 options")
        .max(MAX_OPTIONS, "A maximum of 4 options is allowed")
        .test(
          "one-correct-answer",
          "Select the correct answer",
          (options) =>
            (options as QuizOptionDraft[] | undefined)?.filter(
              (option) => option.is_correct,
            ).length === 1,
        ),
    otherwise: () => array(),
  }),
});

const QuestionFields: FC = () => {
  const { values } = useFormikContext<QuestionFormValues>();

  return (
    <Stack gap="5">
      <Box>
        <Select
          name="type"
          label="Question Type"
          placeholder="Select your question type"
          options={questionTypeOptions}
          portalled={false}
        />

        <HStack gap="2" mt="2" align="flex-start">
          <Image src="/info.svg" alt="" boxSize="4" mt="0.5" flexShrink={0} />
          <Text fontSize="xs" color="gray.500">
            For multiple choice questions, you can add a minimum of two options
            and a maximum of 4 options.
          </Text>
        </HStack>
      </Box>

      <Textarea
        name="prompt"
        label="Question"
        placeholder="Enter your question"
      />

      {values.type === "multiple_choice" && <QuestionOptionsEditor />}

      {values.type === "fill_in_the_blank" && (
        <Textarea
          name="answer"
          label="Enter the Answer"
          placeholder="Enter the answer to the question here"
        />
      )}

      <Button variant="yellow" type="submit" w="full">
        Save
      </Button>
    </Stack>
  );
};

interface QuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (question: QuizQuestionDraft) => void;
  editingQuestion?: QuizQuestionDraft | null;
}

const QuestionModal: FC<QuestionModalProps> = ({
  open,
  onOpenChange,
  onSave,
  editingQuestion,
}) => {
  const initialValues: QuestionFormValues = {
    prompt: editingQuestion?.prompt ?? "",
    type: editingQuestion?.type ?? "",
    answer: editingQuestion?.answer ?? "",
    options: editingQuestion?.options?.length
      ? editingQuestion.options.map((option) => ({ ...option }))
      : [createEmptyOption(), createEmptyOption()],
  };

  return (
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
              <Flex align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  Add Questions
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

              <Formik<QuestionFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values) => {
                  const isMultipleChoice = values.type === "multiple_choice";

                  onSave({
                    id: editingQuestion?.id ?? createId(),
                    prompt: values.prompt.trim(),
                    type: values.type as QuizQuestionType,
                    answer: isMultipleChoice ? "" : values.answer.trim(),
                    options: isMultipleChoice
                      ? values.options.map((option) => ({
                          ...option,
                          text: option.text.trim(),
                        }))
                      : [],
                  });

                  onOpenChange(false);
                }}
              >
                {() => (
                  <Form>
                    <QuestionFields />
                  </Form>
                )}
              </Formik>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default QuestionModal;
