import { type FC } from "react";

import {
  Button,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { QuizDraft } from "@spt/store/createSpolyzStore";

import QuizQuestionOutlineList from "./quizQuestionOutlineList";

interface QuizReviewStepProps {
  title: string;
  draft: QuizDraft;
  onEditOverview: () => void;
  onEditQuestions: () => void;
  onPublish: () => void;
}

const QuizReviewStep: FC<QuizReviewStepProps> = ({
  title,
  draft,
  onEditOverview,
  onEditQuestions,
  onPublish,
}) => {
  const timeLimitDisplay = draft.time_limit.toLowerCase().includes("minute")
    ? draft.time_limit
    : `${draft.time_limit} Minutes`;

  return (
    <Stack gap="6">
      <Text fontSize="md" fontWeight="semibold">
        {title}
      </Text>

      <Stack gap="4">
        <Stack gap="4">
          <Flex
            align="center"
            justify="space-between"
            bg="#EAF6FA"
            borderRadius="xl"
            px="5"
            py="3"
          >
            <Text fontSize="md" fontWeight="semibold" color="dark">
              Overview
            </Text>

            <Button
              variant="yellowOutline"
              size="sm"
              py="2"
              px="4"
              onClick={onEditOverview}
            >
              <HStack gap="2">
                <Image src="/edit-dark.svg" alt="" boxSize="4" />
                <Text>Edit</Text>
              </HStack>
            </Button>
          </Flex>

          <Stack gap="4">
            <ProgressInfo>
              <InfoDisplay title="Quiz Title" value={draft.title} />
            </ProgressInfo>

            <ProgressInfo>
              <InfoDisplay
                flex={{ md: "0 0 100%" }}
                title="Description"
                value={draft.description}
              />
            </ProgressInfo>

            <ProgressInfo>
              <InfoDisplay
                title="Number of Questions"
                value={draft.no_of_questions}
              />
              <InfoDisplay title="Time Limit" value={timeLimitDisplay} />
            </ProgressInfo>

            {draft.pass_mark && (
              <ProgressInfo>
                <InfoDisplay title="Passmark" value={`${draft.pass_mark}%`} />
              </ProgressInfo>
            )}
          </Stack>
        </Stack>

        <Stack gap="4">
          <Flex
            align="center"
            justify="space-between"
            bg="#EAF6FA"
            borderRadius="xl"
            px="5"
            py="3"
          >
            <Text fontSize="md" fontWeight="semibold" color="dark">
              Questions
            </Text>

            <Button
              variant="yellowOutline"
              size="sm"
              py="2"
              px="4"
              onClick={onEditQuestions}
            >
              <HStack gap="2">
                <Image src="/edit-dark.svg" alt="" boxSize="4" />
                <Text>Edit</Text>
              </HStack>
            </Button>
          </Flex>

          <QuizQuestionOutlineList
            questions={draft.questions}
            readOnly
            onEdit={onEditQuestions}
            onRemove={() => undefined}
          />
        </Stack>
      </Stack>

      <Button variant="yellow" w="full" onClick={onPublish}>
        Publish Quiz
      </Button>
    </Stack>
  );
};

export default QuizReviewStep;
