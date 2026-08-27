import { type FC } from "react";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

import type { QuizStep } from "../quizConfig";

const steps: { id: QuizStep; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "questions", label: "Add Questions" },
  { id: "review", label: "Review" },
];

const stepIndex = (step: QuizStep) =>
  steps.findIndex((item) => item.id === step);

interface QuizProgressStepperProps {
  title: string;
  currentStep: QuizStep;
}

const QuizProgressStepper: FC<QuizProgressStepperProps> = ({
  title,
  currentStep,
}) => {
  const activeIndex = stepIndex(currentStep);

  return (
    <Stack gap="0">
      <Text fontSize="md" fontWeight="semibold" mb="6">
        {title}
      </Text>

      {steps.map((step, index) => {
        const isComplete = index < activeIndex;
        const isActive = index === activeIndex;
        const isLast = index === steps.length - 1;

        return (
          <Flex key={step.id} gap="4" align="stretch">
            <Stack align="center" gap="0" flexShrink={0}>
              <Flex
                align="center"
                justify="center"
                w="8"
                h="8"
                borderRadius="full"
                border="2px solid"
                borderColor={isComplete || isActive ? "#F97316" : "#E0E0E0"}
                bg={isComplete ? "#F97316" : "white"}
                color={isComplete ? "white" : "#F97316"}
              >
                {isComplete ? (
                  <HiCheck size={16} />
                ) : isActive ? (
                  <Box w="2.5" h="2.5" borderRadius="full" bg="#F97316" />
                ) : null}
              </Flex>

              {!isLast && (
                <Box
                  w="2px"
                  flex="1"
                  minH="10"
                  bg={index < activeIndex ? "#F97316" : "#E0E0E0"}
                  my="1"
                />
              )}
            </Stack>

            <Stack gap="0" pb={isLast ? "0" : "6"} pt="1">
              <Text
                fontSize="sm"
                fontWeight={isActive ? "semibold" : "medium"}
                color={isActive || isComplete ? "dark" : "gray.400"}
              >
                {step.label}
              </Text>
            </Stack>
          </Flex>
        );
      })}
    </Stack>
  );
};

export default QuizProgressStepper;
