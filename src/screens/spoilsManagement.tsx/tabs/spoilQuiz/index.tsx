import { useState } from "react";

import { Flex, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { Card } from "@spt/components";
import { spoilQuizOptions } from "@spt/utils/spoilData";

import Leaderboard from "./leaderboard";
import Quiz from "./quiz";
import QuizOverview from "./quizOverview";

const SpoilQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isQuizVisible, setIsQuizVisible] = useState(false);

  const handleItemClick = (index) => {
    setCurrentIndex(index);
    setIsQuizVisible(false);
  };
  const handleQuizVisibility = () => setIsQuizVisible((prev) => !prev);

  const handleVisibility = (id: number) => {
    switch (id) {
      case 1:
        return !isQuizVisible ? (
          <QuizOverview onClick={handleQuizVisibility} />
        ) : (
          <Quiz />
        );
      case 2:
        return !isQuizVisible ? (
          <QuizOverview onClick={handleQuizVisibility} />
        ) : (
          <Quiz />
        );
      case 3:
        return <Leaderboard />;
      default:
        return !isQuizVisible ? (
          <QuizOverview onClick={handleQuizVisibility} />
        ) : (
          <Quiz />
        );
    }
  };

  return (
    <Flex gap="8">
      <Card flex={1} px="4">
        <Stack gap="6">
          {spoilQuizOptions?.map((item) => (
            <HStack
              key={item.id}
              justifyContent="space-between"
              _selected={{ bg: "#D4A4371A" }}
              cursor="pointer"
              _hover={{ bg: "#D4A4371A" }}
              py="3"
              px="5"
              borderRadius="lg"
              onClick={() => handleItemClick(item.id)}
              bg={currentIndex === item.id ? "#D4A4371A" : "transparent"}
            >
              <Text>{item?.name}</Text>
              <Image src="/arrow-right.svg" />
            </HStack>
          ))}
        </Stack>
      </Card>

      <Card flex={2}>{handleVisibility(currentIndex)}</Card>
    </Flex>
  );
};

export default SpoilQuiz;