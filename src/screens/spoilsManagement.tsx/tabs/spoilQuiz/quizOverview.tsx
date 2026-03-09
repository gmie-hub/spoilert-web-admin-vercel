import type { FC } from "react";

import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import type { QuizDetailsData } from "@spt/types/quiz";
import { FILL_IN_THE_BLANK, MULTIPLE_CHOICE } from "@spt/utils";

interface ComponentProps {
  onClick: () => void;
  data: QuizDetailsData;
  isQuizDetailsLoading: boolean;
  isError: boolean;
  quizDetailsErrorMessage: string;
}

const QuizOverview: FC<ComponentProps> = ({
  data,
  isError,
  isQuizDetailsLoading,
  quizDetailsErrorMessage,
  onClick,
}) => {
  const questions = data?.questions ?? [];

  const findFillInTheBlanksQuestions = questions.filter(
    (item) => item?.type === FILL_IN_THE_BLANK
  ).length;

  const findMultipleChoiceQuestions = questions.filter(
    (item) => item?.type === MULTIPLE_CHOICE
  ).length;

  const quizInstructions = [
    { id: 1, name: `${data?.no_of_questions ?? 0} Questions` },
    { id: 2, name: `${findMultipleChoiceQuestions} Multiple choice` },
    { id: 3, name: `${findFillInTheBlanksQuestions} Fill in the blank` },
    { id: 4, name: `${data?.time_limit ?? 0} Minutes` },
  ];
  if (isQuizDetailsLoading) return <LoadingState />;

  if (isError) return <ErrorState error={quizDetailsErrorMessage} />;

  return (
    <Stack gap="6">
      <HStack justifyContent="center">
        <Image src="/quiz.gif" w="154px" h="120px" />
      </HStack>

      <Stack gap="6">
        <Text color="gray.500">{data?.description}</Text>

        <Stack gap="4">
          {quizInstructions.map((item) => (
            <HStack key={item.id} gap="2" alignItems="center">
              <Image
                src={
                  quizInstructions.length === item.id
                    ? "/clock.svg"
                    : "/note.svg"
                }
              />
              <Text color="gray.500">{item.name}</Text>
            </HStack>
          ))}
        </Stack>

        <Button onClick={onClick} variant="yellow" py="3">
          View Quiz
        </Button>
      </Stack>
    </Stack>
  );
};

export default QuizOverview;