import { type FC, useRef, useState } from "react";

import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, useFormikContext } from "formik";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

import { Input as FormInput, Select, Textarea } from "@spt/components";
import { useGetAllCategoriesQuery } from "@spt/hooks/api/useGetAllCategoriesQuery";
import { routes } from "@spt/routes";
import {
  type SimpleSpolyzDraft,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

const pricingOptions = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

const lessonTypeOptions = [
  { value: "text", label: "Text" },
  { value: "file", label: "File" },
];

interface SimpleSpolyzFormValues {
  title: string;
  category_id: string;
  institution: string;
  course_code: string;
  pricing: string;
  amount: string;
  expires_at: string;
  description: string;
  what_to_learn: string;
  lesson_type: string;
  lesson_content: string;
}

const AmountField = () => {
  const { values } = useFormikContext<SimpleSpolyzFormValues>();

  if (values.pricing !== "paid") return null;

  return (
    <FormInput name="amount" label="Amount" placeholder="Enter amount" />
  );
};

const CoverImageUpload: FC<{
  file: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  error?: string;
}> = ({ file, preview, onChange, error }) => {
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

const ContentUpload: FC<{
  file: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}> = ({ file, onChange, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field.Root invalid={!!error}>
      <Field.Label fontSize="md">Content Upload</Field.Label>

      <Box
        mt="2"
        border="2px dashed #E0E0E0"
        borderRadius="xl"
        bg="#FBFBFB"
        py="10"
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

      <HStack gap="2" mt="2" align="flex-start">
        <Image src="/info.svg" alt="" boxSize="4" mt="0.5" flexShrink={0} />
        <Text fontSize="xs" color="gray.500">
          Video should not be more than 5mins long.
        </Text>
      </HStack>

      <input
        ref={inputRef}
        type="file"
        accept="video/*,application/pdf,.doc,.docx,.txt"
        hidden
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />

      {error && <Field.ErrorText mt="2">{error}</Field.ErrorText>}
    </Field.Root>
  );
};

const SimpleSpolyzForm = () => {
  const navigate = useNavigate();
  const simpleDraft = useCreateSpolyzStore((s) => s.simpleDraft);
  const setSimpleDraft = useCreateSpolyzStore((s) => s.setSimpleDraft);

  const [coverImage, setCoverImage] = useState<File | null>(
    simpleDraft?.cover_image ?? null,
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    simpleDraft?.cover_preview ?? null,
  );
  const [contentFile, setContentFile] = useState<File | null>(
    simpleDraft?.content_file ?? null,
  );
  const [coverError, setCoverError] = useState<string | undefined>();
  const [contentError, setContentError] = useState<string | undefined>();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(1);

  const categoryOptions =
    categoriesData?.data?.map((cat) => ({
      value: String(cat.id),
      label: cat.name,
    })) ?? [];

  const initialValues: SimpleSpolyzFormValues = {
    title: simpleDraft?.title ?? "",
    category_id: simpleDraft?.category_id ?? "",
    institution: simpleDraft?.institution ?? "",
    course_code: simpleDraft?.course_code ?? "",
    pricing: simpleDraft?.pricing ?? "",
    amount: simpleDraft?.amount ?? "",
    expires_at: simpleDraft?.expires_at ?? "",
    description: simpleDraft?.description ?? "",
    what_to_learn: simpleDraft?.what_to_learn ?? "",
    lesson_type: simpleDraft?.lesson_type ?? "",
    lesson_content: simpleDraft?.lesson_content ?? "",
  };

  const validationSchema = object().shape({
    title: string().required("Spoylz title is required"),
    category_id: string().required("Category is required"),
    institution: string(),
    course_code: string(),
    pricing: string().required("Pricing is required"),
    amount: string().when("pricing", {
      is: "paid",
      then: (schema) => schema.required("Amount is required"),
      otherwise: (schema) => schema,
    }),
    expires_at: string(),
    description: string().required("Description is required"),
    what_to_learn: string().required("This field is required"),
    lesson_type: string().required("Lesson type is required"),
    lesson_content: string().when("lesson_type", {
      is: "text",
      then: (schema) =>
        schema.required(
          "The lesson content field is required when lesson type is text.",
        ),
      otherwise: (schema) => schema,
    }),
  });

  const handleCoverChange = (file: File | null) => {
    setCoverImage(file);
    setCoverError(undefined);

    if (coverPreview && coverPreview !== simpleDraft?.cover_preview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPreview(file ? URL.createObjectURL(file) : null);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values) => {
        let hasError = false;

        if (!coverImage) {
          setCoverError("Cover image is required");
          hasError = true;
        }

        if (values.lesson_type === "file" && !contentFile) {
          setContentError("Content file is required");
          hasError = true;
        }

        if (hasError) return;

        const isTextLesson = values.lesson_type === "text";

        const categoryName =
          categoryOptions.find((cat) => cat.value === values.category_id)
            ?.label ?? "";

        const draft: SimpleSpolyzDraft = {
          ...values,
          category_name: categoryName,
          cover_image: coverImage!,
          cover_preview: coverPreview!,
          content_file: isTextLesson ? null : contentFile,
          lesson_content: isTextLesson ? values.lesson_content : "",
          has_certificate: simpleDraft?.has_certificate ?? false,
        };

        setSimpleDraft(draft);
        navigate(routes.main.createSpolyz.simpleReview);
      }}
    >
      {({ values }) => (
        <Form>
          <Stack gap="6">
            <Text fontSize="sm" color="gray.500" maxW="720px">
              Create a quick Spoylz with essential details. Best for single
              lessons, guides, or introductory content.
            </Text>

            <CoverImageUpload
              file={coverImage}
              preview={coverPreview}
              onChange={handleCoverChange}
              error={coverError}
            />

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap="6">
              <Box gridColumn={{ md: "1 / -1" }}>
                <FormInput
                  name="title"
                  label="Spoylz Title"
                  placeholder="Title"
                />
              </Box>

              <Select
                name="category_id"
                label="Category"
                placeholder={
                  isCategoriesLoading ? "Loading..." : "Select category"
                }
                options={categoryOptions}
              />

              <FormInput
                name="institution"
                label="Institution (Optional)"
                placeholder="Select institution"
              />

              <FormInput
                name="course_code"
                label="Course Code (Optional)"
                placeholder="Course Code"
              />

              <Select
                name="pricing"
                label="Pricing"
                placeholder="Select pricing"
                options={pricingOptions}
              />

              <AmountField />

              <Box gridColumn={{ md: "1 / -1" }}>
                <FormInput
                  name="expires_at"
                  label="Expiry Date"
                  placeholder="Select date"
                  type="date"
                />
                <HStack gap="2" mt="2" align="flex-start">
                  <Image src="/info.svg" alt="" boxSize="4" mt="0.5" flexShrink={0} />
                  <Text fontSize="xs" color="gray.500">
                    Set an expiry date if this Spoylz should only be available
                    for a limited time.
                  </Text>
                </HStack>
              </Box>

              <Box gridColumn={{ md: "1 / -1" }}>
                <Textarea
                  name="description"
                  label="Description"
                  placeholder="Write a description about the project"
                />
              </Box>

              <Box gridColumn={{ md: "1 / -1" }}>
                <Textarea
                  name="what_to_learn"
                  label="What Will They Learn"
                  placeholder="Write what they will learn"
                />
              </Box>

              <Box gridColumn={{ md: "1 / -1" }}>
                <Select
                  name="lesson_type"
                  label="Lesson Type"
                  placeholder="Select lesson type"
                  options={lessonTypeOptions}
                />
              </Box>

              {values.lesson_type === "text" && (
                <Box gridColumn={{ md: "1 / -1" }}>
                  <Textarea
                    name="lesson_content"
                    label="Lesson Content"
                    placeholder="Write the lesson content"
                  />
                </Box>
              )}

              {values.lesson_type === "file" && (
                <Box gridColumn={{ md: "1 / -1" }}>
                  <ContentUpload
                    file={contentFile}
                    onChange={(file) => {
                      setContentFile(file);
                      setContentError(undefined);
                    }}
                    error={contentError}
                  />
                </Box>
              )}
            </Grid>

            <Button variant="yellow" type="submit" w="full">
              Save and continue
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default SimpleSpolyzForm;
