import { type FC } from "react";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

import type { AdvancedStep } from "@spt/store/createSpolyzStore";

const steps: { id: AdvancedStep; label: string }[] = [
  { id: "basics", label: "Spoylz Basics" },
  { id: "outline", label: "Spoylz Outline" },
  { id: "review", label: "Spoylz Review" },
];

const stepIndex = (step: AdvancedStep) =>
  steps.findIndex((item) => item.id === step);

interface SpolyzProgressStepperProps {
  currentStep: AdvancedStep;
}

const SpolyzProgressStepper: FC<SpolyzProgressStepperProps> = ({
  currentStep,
}) => {
  const activeIndex = stepIndex(currentStep);

  return (
    <Stack gap="0">
      <Text fontSize="md" fontWeight="semibold" mb="6">
        Spoylz Progress
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
                borderColor={
                  isComplete || isActive ? "#DA8543" : "#E0E0E0"
                }
                bg={isComplete ? "#DA8543" : isActive ? "white" : "white"}
                color={isComplete ? "white" : "#DA8543"}
              >
                {isComplete ? (
                  <HiCheck size={16} />
                ) : isActive ? (
                  <Box w="2.5" h="2.5" borderRadius="full" bg="#DA8543" />
                ) : null}
              </Flex>

              {!isLast && (
                <Box
                  w="2px"
                  flex="1"
                  minH="10"
                  bg={index < activeIndex ? "#DA8543" : "#E0E0E0"}
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

export default SpolyzProgressStepper;
