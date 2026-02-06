import { type FC, useEffect, useState } from "react";

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
import { useGetQuizDetailsQuery } from "@spt/hooks/api/useGetQuizDetailsQuery";
import type { QuizDatum } from "@spt/types/quiz";

import Quiz from "./quiz";
import QuizOverview from "./quizOverview";

interface ComponentProps {
  quizData: QuizDatum[];
  isQuizLoading: boolean;
  isError: boolean;
  quizErrorMessage: string;
}

const SpoilQuiz: FC<ComponentProps> = ({
  quizData,
  isQuizLoading,
  isError,
  quizErrorMessage,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizId, setQuizId] = useState<number>();
  const [isQuizVisible, setIsQuizVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("preSpoilQuiz");
  const [isLargeScreen] = useMediaQuery(["(min-width: 768px)"], {
    fallback: [true],
  });
  const [isSmallScreen] = useMediaQuery(["(max-width: 767px)"], {
    fallback: [true],
  });

  const PRE = "pre";

  const spoilQuizOptions =
    quizData?.map((item, index) => ({
      id: index + 1,
      text: item?.type === PRE ? "Pre-Spoil Quiz" : "Post-Spoil Quiz",
      value: item?.type === PRE ? "preSpoilQuiz" : "postSpoilQuiz",
    })) || [];

  const {
    quizDetailsData,
    isQuizDetailsError,
    isQuizDetailsLoading,
    quizDetailsErrorMessage,
  } = useGetQuizDetailsQuery(quizId);

  useEffect(() => {
    setQuizId(quizData[currentIndex]?.id);
  }, [quizData]);

  const handleItemClick = (index: number, quizId: number) => {
    setCurrentIndex(index);
    setQuizId(quizId);
    setIsQuizVisible(false);
  };

  const handleQuizVisibility = () => setIsQuizVisible((prev) => !prev);

  const handleVisibility = (id: number) => {
    switch (id) {
      case 1:
        return !isQuizVisible ? (
          <QuizOverview
            data={quizDetailsData}
            onClick={handleQuizVisibility}
            isQuizDetailsLoading={isQuizDetailsLoading}
            isError={isQuizDetailsError}
            quizDetailsErrorMessage={quizDetailsErrorMessage}
          />
        ) : (
          <Quiz data={quizDetailsData} />
        );
      case 2:
        return !isQuizVisible ? (
          <QuizOverview
            data={quizDetailsData}
            onClick={handleQuizVisibility}
            isQuizDetailsLoading={isQuizDetailsLoading}
            isError={isQuizDetailsError}
            quizDetailsErrorMessage={quizDetailsErrorMessage}
          />
        ) : (
          <Quiz data={quizDetailsData} />
        );
      default:
        return !isQuizVisible ? (
          <QuizOverview
            data={quizDetailsData}
            onClick={handleQuizVisibility}
            isQuizDetailsLoading={isQuizDetailsLoading}
            isError={isQuizDetailsError}
            quizDetailsErrorMessage={quizDetailsErrorMessage}
          />
        ) : (
          <Quiz data={quizDetailsData} />
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
            {quizData?.map((item, index) => (
              <HStack
                key={index}
                justifyContent="space-between"
                _selected={{ bg: "#D4A4371A" }}
                cursor="pointer"
                _hover={{ bg: "#D4A4371A" }}
                py="3"
                px="5"
                borderRadius="lg"
                onClick={() => handleItemClick(index, item.id)}
                bg={currentIndex === item.id ? "#D4A4371A" : "transparent"}
              >
                <Text>
                  {item?.type === PRE ? "Pre-Spoil Quiz" : "Post-Spoil Quiz"}
                </Text>
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
          hasIndicator
          value={selectedTab}
          onValueChange={(e) => {
            const { value } = e;

            setSelectedTab(value);
            const index = value === "preSpoilQuiz" ? 0 : 1;
            handleItemClick(index, quizData[index]?.id);
          }}
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
