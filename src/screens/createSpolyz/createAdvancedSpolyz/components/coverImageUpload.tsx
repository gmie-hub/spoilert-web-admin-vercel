import { type FC, useRef } from "react";

import { Field, Flex, Image, Stack, Text } from "@chakra-ui/react";

interface CoverImageUploadProps {
  file: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  error?: string;
}

const CoverImageUpload: FC<CoverImageUploadProps> = ({
  file,
  preview,
  onChange,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field.Root invalid={!!error}>
      <Flex
        align="center"
        gap="4"
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Flex
          align="center"
          justify="center"
          w="20"
          h="20"
          borderRadius="xl"
          bg="#EAF6FA"
          overflow="hidden"
          flexShrink={0}
          border="2px dashed #D4EDF5"
        >
          {preview ? (
            <Image
              src={preview}
              alt="Cover preview"
              objectFit="cover"
              w="full"
              h="full"
            />
          ) : (
            <Image src="/book.svg" alt="" boxSize="8" />
          )}
        </Flex>

        <Stack gap="0">
          <Text fontSize="sm" fontWeight="medium" color="dark">
            Upload Cover Image
          </Text>
          {file && (
            <Text fontSize="xs" color="gray.500">
              {file.name}
            </Text>
          )}
        </Stack>
      </Flex>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {error && <Field.ErrorText mt="2">{error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default CoverImageUpload;
