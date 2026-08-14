import { type FC, useRef } from "react";

import { Box, Field, Flex, Stack, Text } from "@chakra-ui/react";
import { HiOutlineUpload } from "react-icons/hi";

interface LessonFileUploadProps {
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const LessonFileUpload: FC<LessonFileUploadProps> = ({
  file,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field.Root invalid={!!error}>
      <Field.Label fontSize="md">Upload File</Field.Label>

      <Box
        mt="2"
        border="2px dashed #E0E0E0"
        borderRadius="xl"
        bg="#FBFBFB"
        py="8"
        px="4"
        textAlign="center"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
        _hover={{ borderColor: "blue.100", bg: "#F7FAFB" }}
      >
        <Stack gap="2" align="center">
          <Flex
            align="center"
            justify="center"
            w="10"
            h="10"
            borderRadius="full"
            bg="#EAF6FA"
            color="blue.100"
            mx="auto"
          >
            <HiOutlineUpload size={20} />
          </Flex>
          <Text fontSize="sm" fontWeight="medium" color="dark">
            Upload File
          </Text>
          {file && (
            <Text fontSize="xs" color="gray.500">
              {file.name}
            </Text>
          )}
        </Stack>
      </Box>

      <input
        ref={inputRef}
        type="file"
        accept="video/*,application/pdf,.doc,.docx,.txt,image/*"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {error && <Field.ErrorText mt="2">{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default LessonFileUpload;
