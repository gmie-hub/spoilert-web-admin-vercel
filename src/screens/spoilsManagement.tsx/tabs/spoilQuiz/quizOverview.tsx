import type { FC } from "react";

import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

import type { QuizData } from "@spt/types/quiz";
import { FILL_IN_THE_BLANK, MULTIPLE_CHOICE } from "@spt/utils";

interface ComponentProps {
  onClick: () => void;
  data: QuizData;
}

const QuizOverview: FC<ComponentProps> = ({ data, onClick }) => {
  const findFillInTheBlanksQuestions = data?.questions?.filter(
    (item) => item?.type === FILL_IN_THE_BLANK
  )?.length;

  const findMultipleChoiceQuestions = data?.questions?.filter(
    (item) => item?.type === MULTIPLE_CHOICE
  )?.length;

  const quizInstructions = [
  { id: 1, name: `${data?.no_of_questions} Questions` },
  { id: 2, name: `${findMultipleChoiceQuestions} Multiple choice` },
  { id: 3, name: `${findFillInTheBlanksQuestions} Fill in the blank` },
  { id: 4, name: `${data?.time_limit} Minutes` },
];

  return (
    <Stack gap="6">
      <HStack justifyContent="center">
        <Image src="/quiz.gif" w="154px" h="120px" />
      </HStack>

      <Stack gap="6">
        <Text color="gray.500">
          {data?.description}
        </Text>

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