import { useState } from "react";

import {
  Flex,
  HStack,
  Image,
  Stack,
  Tabs,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import CustomTabs from "@spt/components/tabs";
import { useGetQuizBySpoilId } from "@spt/hooks/api/useGetQuizBySpoilId";

import Quiz from "./quiz";
import QuizOverview from "./quizOverview";

const SpoilQuiz = ({ id }: { id: number }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [isLargeScreen] = useMediaQuery(["(min-width: 768px)"], {
    fallback: [true],
  });
  const [isSmallScreen] = useMediaQuery(["(max-width: 767px)"], {
    fallback: [true],
  });

  const { quizData, isQuizLoading, isError, quizErrorMessage } =
    useGetQuizBySpoilId(id);

  const handleItemClick = (index) => {
    setCurrentIndex(index);
    setIsQuizVisible(false);
  };
  const handleQuizVisibility = () => setIsQuizVisible((prev) => !prev);

  const handleVisibility = (id: number) => {
    switch (id) {
      case 1:
        return !isQuizVisible ? (
          <QuizOverview data={quizData} onClick={handleQuizVisibility} />
        ) : (
          <Quiz data={quizData} />
        );
      case 2:
        return !isQuizVisible ? (
          <QuizOverview data={quizData} onClick={handleQuizVisibility} />
        ) : (
          <Quiz data={quizData} />
        );
      default:
        return !isQuizVisible ? (
          <QuizOverview data={quizData} onClick={handleQuizVisibility} />
        ) : (
          <Quiz data={quizData} />
        );
    }
  };

  if (isQuizLoading) <LoadingState />;

  if (isError) <ErrorState error={quizErrorMessage} />;

  return (
    <Flex direction={{ base: "column", md: "row" }} gap="8">
      {isLargeScreen && (
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
                <Text>{item?.text}</Text>
                <Image src="/arrow-right.svg" />
              </HStack>
            ))}
          </Stack>
        </Card>
      )}

      {isSmallScreen && (
        <CustomTabs
          tabList={spoilQuizOptions}
          variant="plain"
          bg="#F0FBFF"
          p="1"
          // onClick={() => handleItemClick(item.id)}
          hasIndicator
        >
          <>
            <Tabs.Content value="preSpoilQuiz">
              {handleVisibility(currentIndex)}
            </Tabs.Content>

            <Tabs.Content value="postSpoilQuiz">
              {handleVisibility(currentIndex)}
            </Tabs.Content>
          </>
        </CustomTabs>
      )}

      {isLargeScreen && <Card flex={2}>{handleVisibility(currentIndex)}</Card>}
    </Flex>
  );
};

export default SpoilQuiz;

const spoilQuizOptions = [
  { id: 1, text: "Pre-Spoil Quiz", value: "preSpoilQuiz" },
  { id: 2, text: "Post-Spoil Quiz", value: "postSpoilQuiz" },
];