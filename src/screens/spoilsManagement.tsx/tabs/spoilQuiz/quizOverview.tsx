import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { quizInstructions } from "@spt/utils/spoilData";

const QuizOverview = ({ onClick }: { onClick: () => void }) => {
  return (
    <Stack gap="6">
      <HStack justifyContent="center">
        <Image src="/quiz.gif" w="154px" h="120px" />
      </HStack>

      <Stack gap="6">
        <Text color="gray.500">
          Test your knowledge of frontend development with this interactive
          quiz! Covering essential topics such as HTML, CSS, JavaScript,
          responsive design, and modern frontend frameworks like React and
          Vue.js.
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
