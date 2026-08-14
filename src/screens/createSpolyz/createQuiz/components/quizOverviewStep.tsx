import { type FC } from "react";

import { Button, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";

import { Input, Textarea } from "@spt/components";
import type { QuizDraft } from "@spt/store/createSpolyzStore";

import type { QuizVariant } from "../quizConfig";

interface QuizOverviewFormValues {
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
    time_limit: string().trim().required("Time limit is required"),
    pass_mark:
      variant === "post"
        ? numberField("Passmark", 0, 100).required(
            "Passmark is required for post-Spoylz quiz",
          )
        : string(),
  });

interface QuizOverviewStepProps {
  variant: QuizVariant;
  draft: QuizDraft;
  onContinue: (values: QuizOverviewFormValues) => void;
}

const QuizOverviewStep: FC<QuizOverviewStepProps> = ({
  variant,
  draft,
  onContinue,
}) => {
  const initialValues: QuizOverviewFormValues = {
    title: draft.title,
    description: draft.description,
    no_of_questions: draft.no_of_questions,
    time_limit: draft.time_limit,
    pass_mark: draft.pass_mark,
  };

  return (
    <Stack gap="6">
      <Text fontSize="md" fontWeight="semibold">
        Overview
      </Text>

      <Formik<QuizOverviewFormValues>
        initialValues={initialValues}
        validationSchema={buildValidationSchema(variant)}
        enableReinitialize
        onSubmit={onContinue}
      >
        {() => (
          <Form>
            <Stack gap="5">
              <Input
                name="title"
                label="Quiz Title"
                placeholder="Introduction to frontend development"
              />

              <Textarea
                name="description"
                label="Description"
                placeholder="Test your knowledge of frontend development basics, including HTML, CSS, and JavaScript."
              />

              <Input
                name="no_of_questions"
                label="Number of Questions"
                placeholder="10"
                type="number"
              />

              <Input
                name="time_limit"
                label="Time Limit"
                placeholder="50 Minutes"
              />

              {variant === "post" && (
                <Input
                  name="pass_mark"
                  label="Passmark"
                  placeholder="Enter passmark (e.g. 50)"
                  type="number"
                />
              )}

              <Button variant="yellow" type="submit" w="full">
                Save and continue
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default QuizOverviewStep;
