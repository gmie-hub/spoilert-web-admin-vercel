import { type FC } from "react";

import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

import type { QuizOptionDraft } from "@spt/store/createSpolyzStore";

import { MAX_OPTIONS, MIN_OPTIONS, createEmptyOption } from "./questionOptions";

interface OptionsFormValues {
  options: QuizOptionDraft[];
}

/** 2 - 4 options, exactly one marked correct. */
const QuestionOptionsEditor: FC = () => {
  const { values, errors, submitCount, setFieldValue } =
    useFormikContext<OptionsFormValues>();

  const error =
    submitCount > 0 && typeof errors.options === "string"
      ? errors.options
      : undefined;

  const updateOption = (id: string, text: string) => {
    setFieldValue(
      "options",
      values.options.map((option) =>
        option.id === id ? { ...option, text } : option,
      ),
    );
  };

  const markCorrect = (id: string) => {
    setFieldValue(
      "options",
      values.options.map((option) => ({
        ...option,
        is_correct: option.id === id,
      })),
    );
  };

  const addOption = () => {
    if (values.options.length >= MAX_OPTIONS) return;
    setFieldValue("options", [...values.options, createEmptyOption()]);
  };

  const removeOption = (id: string) => {
    if (values.options.length <= MIN_OPTIONS) return;
    setFieldValue(
      "options",
      values.options.filter((option) => option.id !== id),
    );
  };

  return (
    <Field.Root invalid={!!error}>
      <Flex align="center" justify="space-between" gap="3">
        <Field.Label fontSize="md" mb="0">
          Options
        </Field.Label>

        <Button
          variant="yellowOutline"
          size="sm"
          py="2"
          flexShrink={0}
          disabled={values.options.length >= MAX_OPTIONS}
          onClick={addOption}
        >
          <HStack gap="1">
            <HiOutlinePlus size={14} />
            <Text>Add Option</Text>
          </HStack>
        </Button>
      </Flex>

      <Text fontSize="xs" color="gray.500" mt="2">
        After adding your options, select the correct answer to the question.
      </Text>

      <Stack gap="3" mt="4" w="full">
        {values.options.map((option, index) => {
          const isCorrect = option.is_correct;

          return (
            <Box
              key={option.id}
              border="1px solid"
              borderColor={isCorrect ? "#0F7EA0" : "#EFEFEF"}
              borderRadius="xl"
              bg={isCorrect ? "#EAF6FA" : "#FBFBFB"}
              px="4"
              py="3"
            >
              <Flex align="flex-start" gap="3">
                <Checkbox.Root
                  checked={isCorrect}
                  onCheckedChange={() => markCorrect(option.id)}
                  mt="1"
                  colorPalette="teal"
                >
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>

                <Stack gap="2" flex="1" minW="0">
                  <Text fontSize="xs" color="gray.500">
                    Option {index + 1}
                  </Text>

                  <Input
                    value={option.text}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    bg="white"
                    border="1px solid #EFEFEF"
                    borderRadius="xl"
                    h="44px"
                    _placeholder={{ fontSize: "sm", color: "gray.100" }}
                  />

                  {isCorrect && (
                    <Text fontSize="xs" color="#0F7EA0" fontWeight="medium">
                      Correct Answer
                    </Text>
                  )}
                </Stack>

                <IconButton
                  aria-label="Remove option"
                  variant="ghost"
                  size="sm"
                  color="red.500"
                  flexShrink={0}
                  disabled={values.options.length <= MIN_OPTIONS}
                  onClick={() => removeOption(option.id)}
                >
                  <HiOutlineTrash size={16} />
                </IconButton>
              </Flex>
            </Box>
          );
        })}
      </Stack>

      {error && <Field.ErrorText mt="2">{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default QuestionOptionsEditor;
