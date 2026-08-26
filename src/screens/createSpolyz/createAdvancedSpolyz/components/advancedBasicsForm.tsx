import { type FC, useState } from "react";

import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, useFormikContext } from "formik";
import { object, string } from "yup";

import { Input as FormInput, Select, Textarea } from "@spt/components";
import { useGetAllCategoriesQuery } from "@spt/hooks/api/useGetAllCategoriesQuery";
import {
  type AdvancedSpolyzDraft,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";
import { readFileAsDataUrl } from "@spt/utils/coverImage";

import CoverImageUpload from "./coverImageUpload";

const pricingOptions = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
];

interface BasicsFormValues {
  title: string;
  category_id: string;
  institution: string;
  course_code: string;
  pricing: string;
  amount: string;
  expires_at: string;
  modules_count: string;
  lessons_count: string;
  description: string;
  what_to_learn: string;
}

const AmountField = () => {
  const { values } = useFormikContext<BasicsFormValues>();
  if (values.pricing !== "paid") return null;
  return (
    <FormInput name="amount" label="Amount" placeholder="Enter amount" />
  );
};

interface AdvancedBasicsFormProps {
  onContinue: () => void;
}

const AdvancedBasicsForm: FC<AdvancedBasicsFormProps> = ({ onContinue }) => {
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setAdvancedDraft = useCreateSpolyzStore((s) => s.setAdvancedDraft);

  const [coverImage, setCoverImage] = useState<File | null>(
    advancedDraft?.cover_image ?? null,
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    advancedDraft?.cover_preview ?? null,
  );
  const [coverError, setCoverError] = useState<string | undefined>();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetAllCategoriesQuery(1);

  const categoryOptions =
    categoriesData?.data?.map((cat) => ({
      value: String(cat.id),
      label: cat.name,
    })) ?? [];

  const initialValues: BasicsFormValues = {
    title: advancedDraft?.title ?? "",
    category_id: advancedDraft?.category_id ?? "",
    institution: advancedDraft?.institution ?? "",
    course_code: advancedDraft?.course_code ?? "",
    pricing: advancedDraft?.pricing ?? "",
    amount: advancedDraft?.amount ?? "",
    expires_at: advancedDraft?.expires_at ?? "",
    modules_count: advancedDraft?.modules_count ?? "",
    lessons_count: advancedDraft?.lessons_count ?? "",
    description: advancedDraft?.description ?? "",
    what_to_learn: advancedDraft?.what_to_learn ?? "",
  };

  const handleCoverChange = (file: File | null) => {
    setCoverImage(file);
    setCoverError(undefined);

    if (!file) {
      setCoverPreview(null);
      return;
    }

    // A data URL, not an object URL, so the preview survives a reload.
    readFileAsDataUrl(file).then(setCoverPreview);
  };

  return (
    <Stack gap="6">
      <Stack gap="1">
        <Text fontSize="md" fontWeight="semibold">
          Spoylz Basics
        </Text>
        <Text fontSize="sm" color="gray.500">
          Start by providing basic information about your Spoylz.
        </Text>
      </Stack>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={object().shape({
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
          modules_count: string()
            .required("Modules is required")
            .matches(/^[1-9][0-9]*$/, "Enter a number greater than 0"),
          lessons_count: string()
            .required("Lessons is required")
            .matches(/^[1-9][0-9]*$/, "Enter a number greater than 0"),
          description: string().required("Description is required"),
          what_to_learn: string().required("This field is required"),
        })}
        onSubmit={(values) => {
          if (!coverImage) {
            setCoverError("Cover image is required");
            return;
          }

          const categoryName =
            categoryOptions.find((cat) => cat.value === values.category_id)
              ?.label ?? "";

          const draft: AdvancedSpolyzDraft = {
            ...values,
            category_name: categoryName,
            cover_image: coverImage,
            cover_preview: coverPreview!,
            has_certificate: advancedDraft?.has_certificate ?? false,
            modules: advancedDraft?.modules ?? [],
            pre_quiz: advancedDraft?.pre_quiz ?? null,
            post_quiz: advancedDraft?.post_quiz ?? null,
          };

          setAdvancedDraft(draft);
          onContinue();
        }}
      >
        {() => (
          <Form>
            <Stack gap="6">
              <CoverImageUpload
                file={coverImage}
                preview={coverPreview}
                onChange={handleCoverChange}
                error={coverError}
              />

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
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
                    <Image
                      src="/info.svg"
                      alt=""
                      boxSize="4"
                      mt="0.5"
                      flexShrink={0}
                    />
                    <Text fontSize="xs" color="gray.500">
                      Set an expiry date if this Spoylz should only be available
                      for a limited time.
                    </Text>
                  </HStack>
                </Box>

                <FormInput
                  name="modules_count"
                  label="Modules"
                  placeholder="Number of modules"
                  numeric
                />

                <FormInput
                  name="lessons_count"
                  label="Lessons"
                  placeholder="Number of lessons"
                  numeric
                />

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
              </Grid>

              <Button variant="yellow" type="submit" w="full">
                Save and continue
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default AdvancedBasicsForm;
