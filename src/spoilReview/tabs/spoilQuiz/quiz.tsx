import { useState } from "react";

import {
  Box,
  Button,
  Center,
  Field,
  HStack,
  Image,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { quizQuestions } from "@spt/utils/spoilData";

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [visitedIndices, setVisitedIndices] = useState<number[]>([]);

  const questionLength = Array.from(
    { length: quizQuestions?.length },
    (_, i) => i
  );

  const currentQuestion = quizQuestions[currentIndex - 1];
  const correctAnswer = quizQuestions[currentIndex]?.answer;

  const handlePrevious = () => {
    setVisitedIndices((prev) => prev.filter((index) => index !== currentIndex));
    setCurrentIndex((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setVisitedIndices((prev) => [...new Set([...prev, currentIndex])]);
    setCurrentIndex((prevState) => prevState + 1);
  };

  return (
    <Stack gap="7">
      <HStack gap="4">
        {questionLength?.map((item, index) => {
          const isVisited = visitedIndices.includes(index + 1);

          const getBgColor = () => {
            switch (true) {
              case index + 1 === currentIndex:
                return "blue.100";
              case isVisited:
                return "transparent";
              default:
                return "#D4A43780";
            }
          };

          return (
            <Center
              key={index}
              h="10"
              w="10"
              borderRadius="md"
              bg={getBgColor()}
              color={currentIndex - 1 > index ? "blue.100" : "#fff"}
              border={isVisited ? "1px solid #013B4D" : "none"}
            >
              {item + 1}
            </Center>
          );
        })}
      </HStack>

      <HStack justifyContent="space-between" alignItems="center">
        <Text fontWeight="normal" color="gray">
          Question{" "}
          <Text as="span" fontWeight="medium" fontSize="sm">
            {currentIndex}{" "}
          </Text>
          of{" "}
          <Text as="span" fontWeight="medium" fontSize="sm">
            {quizQuestions.length}
          </Text>
        </Text>

        <HStack>
          <Image src="/table-clock.svg" />
          <Text fontWeight="medium">00:50</Text>
        </HStack>
      </HStack>

      <Stack gap="6">
        <Box p="4" bg="#D4A43714" borderRadius="xl">
          <Text>{currentQuestion?.question}</Text>
        </Box>

        {currentQuestion.options.length > 1 &&
          currentQuestion.options.map((item, index) => {
            const isCorrectAnswer = correctAnswer === item;

            return (
              <HStack
                key={index}
                px="4"
                py="3"
                bg="#FBFBFB"
                borderRadius="xl"
                border={
                  isCorrectAnswer ? "2px solid #28A745" : "1px solid #EFEFEF"
                }
              >
                <Image
                  src={isCorrectAnswer ? "/checked.svg" : "/radio.svg"}
                  alt="radio"
                />
                <Text>{item}</Text>
              </HStack>
            );
          })}

        {currentQuestion.options.length === 1 && (
          <Field.Root required>
            <Field.Label>Answer</Field.Label>
            <Textarea
              placeholder="Start typing..."
              variant="subtle"
              size="xl"
              value={currentQuestion.options[0]}
              bg="none"
              border="1px solid #4D4B4B"
              borderRadius="xl"
              disabled
              _disabled={{ color: "dark" }}
            />
          </Field.Root>
        )}
      </Stack>

      <HStack>
        {currentIndex > 1 && (
          <Button
            variant="yellow"
            flex="1"
            mt="2"
            borderRadius="xl"
            onClick={handlePrevious}
          >
            Previous
          </Button>
        )}

        {currentIndex !== quizQuestions.length && (
          <Button
            variant="yellow"
            flex="1"
            mt="2"
            borderRadius="xl"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </HStack>
    </Stack>
  );
};

export default Quiz;