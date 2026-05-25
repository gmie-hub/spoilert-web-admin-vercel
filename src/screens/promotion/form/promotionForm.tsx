import { Button, Flex, HStack, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Input, Select } from "@spt/components";
import { useCreatePromotionPackageMutation } from "@spt/hooks/api/useCreatePromotionPackageMutation";
import { useUpdatePromotionPackageMutation } from "@spt/hooks/api/useUpdatePromotionPackageMutation";
import { useSuccessStore } from "@spt/store";

const baseDurationOptions = [
  { value: "1", label: "1 day" },
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
  { value: "60", label: "60 days" },
  { value: "90", label: "90 days" },
];

const buildDurationOptions = (currentValue?: string) => {
  if (!currentValue) return baseDurationOptions;
  if (baseDurationOptions.some((o) => o.value === currentValue)) {
    return baseDurationOptions;
  }
  return [
    {
      value: currentValue,
      label: `${currentValue} ${currentValue === "1" ? "day" : "days"}`,
    },
    ...baseDurationOptions,
  ];
};

interface FormValues {
  name: string;
  duration: string;
  amount: string;
}

const defaultValues: FormValues = {
  name: "",
  duration: "",
  amount: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Promotion name is required"),
  duration: Yup.string().required("Duration is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
});

interface PromotionFormProps {
  initialValues?: FormValues;
  packageId?: number;
}

const PromotionForm = ({
  initialValues,
  packageId,
}: PromotionFormProps) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const { createPromotionPackage, isLoading: isCreateLoading } =
    useCreatePromotionPackageMutation();
  const { updatePromotionPackage, isUpdateLoading } =
    useUpdatePromotionPackageMutation(packageId);

  // Edit mode is determined by having an existing package id.
  // If a packageId is present, this is an update; otherwise it's a create.
  const isEditing = packageId != null;
  const isSubmitting = isEditing ? isUpdateLoading : isCreateLoading;
  const durationOptions = buildDurationOptions(initialValues?.duration);

  return (
    <Formik
      initialValues={initialValues ?? defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={async (values: FormValues, { resetForm }) => {
        const payload = {
          name: values.name,
          duration: Number(values.duration),
          amount: Number(values.amount),
        };

        try {
          if (isEditing) {
            // Edit mode → call the update endpoint
            await updatePromotionPackage(payload);
          } else {
            // Create mode → call the create endpoint
            await createPromotionPackage(payload);
            resetForm();
          }
          setOpenSuccess(true);
        } catch {
          // error toast is handled inside the mutation hook
        }
      }}
    >
      {() => (
        <Form>
          <Stack gap="6">
            <HStack gap="6">
              <Input
                name="name"
                label="Promotion Name"
                placeholder="Enter the promotion name"
              />

              <Select
                name="duration"
                label="Duration"
                placeholder="Select the duration for the promotion"
                options={durationOptions}
              />
            </HStack>

            <Input
              name="amount"
              type="number"
              label="Amount"
              placeholder="Enter the amount for this promotion"
            />

            <Flex
              direction={{ base: "column", md: "row" }}
              mt="6"
              gap="5"
              justifyContent="flex-end"
            >
              <Button
                variant="yellowOutline"
                type="button"
                w={{ base: "full", md: "20%" }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                variant="yellow"
                type="submit"
                w={{ base: "full", md: "20%" }}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Saving..."
                  : isEditing
                    ? "Update"
                    : "Save"}
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default PromotionForm;
