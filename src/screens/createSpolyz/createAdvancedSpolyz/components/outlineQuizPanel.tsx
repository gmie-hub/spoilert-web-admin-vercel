import { type FC } from "react";

import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";

import type { QuizDraft } from "@spt/store/createSpolyzStore";

import { formatQuizSummary } from "./quizSummary";

interface OutlineQuizPanelProps {
  preQuiz: QuizDraft | null;
  postQuiz: QuizDraft | null;
  onOpenPreQuiz: () => void;
  onOpenPostQuiz: () => void;
}

const OutlineQuizPanel: FC<OutlineQuizPanelProps> = ({
  preQuiz,
  postQuiz,
  onOpenPreQuiz,
  onOpenPostQuiz,
}) => {
  return (
    <Box
      border="1px solid #EFEFEF"
      borderRadius="xl"
      bg="#FBFBFB"
      px="5"
      py="4"
    >
      <Text fontSize="sm" color="gray.600" mb="4">
        Create pre-Spoylz and post-Spoylz quiz so you can track your
        learner&apos;s progress before and after taking the Spoylz.
      </Text>

      <Flex direction={{ base: "column", sm: "row" }} gap="3" wrap="wrap">
        <Stack gap="1" flex="1" minW="200px">
          <Button variant="yellowOutline" w="full" onClick={onOpenPreQuiz}>
            <HStack gap="2">
              {!preQuiz && <HiOutlinePlus size={18} />}
              <Text>
                {preQuiz ? "Edit Pre-Spoylz Quiz" : "Create Pre-Spoylz Quiz"}
              </Text>
            </HStack>
          </Button>

          {preQuiz && (
            <Text fontSize="xs" color="gray.500" textAlign="center">
              {formatQuizSummary(preQuiz)}
            </Text>
          )}
        </Stack>

        <Stack gap="1" flex="1" minW="200px">
          <Button variant="yellowOutline" w="full" onClick={onOpenPostQuiz}>
            <HStack gap="2">
              {!postQuiz && <HiOutlinePlus size={18} />}
              <Text>
                {postQuiz ? "Edit Post-Spoylz Quiz" : "Create Post-Spoylz Quiz"}
              </Text>
            </HStack>
          </Button>

          {postQuiz && (
            <Text fontSize="xs" color="gray.500" textAlign="center">
              {formatQuizSummary(postQuiz)}
            </Text>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default OutlineQuizPanel;
