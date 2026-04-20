// Dummy ad sizes array
const adSizes = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "full", label: "Full" },
];
import { useState } from "react";

import { Button, Flex, Grid, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Input, Select } from "@spt/components";
import { useAddAdMutation } from "@spt/hooks/api/useAddAdMutation";
import { useGetAllCategoriesQuery } from "@spt/hooks/api/useGetAllCategoriesQuery";
import { useSuccessStore } from "@spt/store";

const AdsForm = ({ initialValues }: { initialValues?: any }) => {
  const defaultInitialValues = {
    title: "",
    url: "",
    category_id: "",
    size: "",
    start_date: "",
    end_date: "",
    status: "enabled",
    image: null,
  };
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const { addAd, isLoading } = useAddAdMutation();
  const [image, setImage] = useState<File | null>(null);
  // Fetch all categories for the select options
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    categoryErrorMessage,
  } = useGetAllCategoriesQuery(1);
  const categoryOptions =
    categoriesData?.data?.map((cat: any) => ({
      value: cat.id?.toString?.() ?? String(cat.id),
      label: cat.name,
    })) ?? [];


    console.log(initialValues,'initialValues')
  // ✅ validation schema inside component (so it can access image state)
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    url: Yup.string().url("Invalid URL").required("URL is required"),
    category_id: Yup.string().required("Category is required"),
    size: Yup.string().required("Ad size is required"),
    // start_date: Yup.string().required("Start date is required"),
    // end_date: Yup.string().required("End date is required"),

    start_date: Yup.string().required("Start date is required"),
    end_date: Yup.string()
      .required("End date is required")
      .test(
        "endDateAfterStartDate",
        "End date must be after start date",
        function (value) {
          const { start_date } = this.parent;
          if (!start_date || !value) return true;
          return new Date(value) > new Date(start_date);
        },
      ),
    status: Yup.string().required(),
    image: Yup.mixed()
      .test("fileRequired", "Image is required", function () {
        return !!image;
      })
      .test("fileType", "Only PNG, JPEG, JPG files are allowed", function () {
        if (!image) return true; // skip if not present, handled by fileRequired
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        return allowedTypes.includes(image.type);
      }),
  });

  return (
    <Formik
      initialValues={{
        ...defaultInitialValues,
        ...initialValues,
        image: null, // always reset image field
      }}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addAd({
            ...values,
            image,
          });

          setOpenSuccess(true);
          resetForm();
          setImage(null);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form>
          <Stack gap="6">
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <Input name="title" label="Title" placeholder="Enter ads title" />
              <Input name="url" label="URL" placeholder="Enter the url" />

              <Select
                name="category_id"
                label="Category"
                placeholder={
                  isCategoriesLoading
                    ? "Loading..."
                    : isCategoriesError
                      ? "Failed to load categories"
                      : "Select category"
                }
                options={categoryOptions}
              />
              {isCategoriesLoading && (
                <div style={{ color: "gray", gridColumn: "1 / -1" }}>
                  Loading categories...
                </div>
              )}
              {isCategoriesError && (
                <div style={{ color: "red", gridColumn: "1 / -1" }}>
                  {categoryErrorMessage || "Failed to load categories."}
                </div>
              )}
              {isCategoriesError && (
                <div style={{ color: "red", gridColumn: "1 / -1" }}>
                  {categoryErrorMessage || "Failed to load categories."}
                </div>
              )}

              <Select
                name="size"
                label="Ad Size"
                placeholder="Select Ad size"
                options={adSizes}
              />

              <Input
                type="date"
                name="start_date"
                label="Start Date"
                placeholder="Select start date"
              />
              <Input
                type="date"
                name="end_date"
                label="End Date"
                placeholder="Select end date"
              />

              <Select
                name="status"
                label="Status"
                placeholder="Select status"
                options={[
                  { value: "enabled", label: "Enabled" },
                  { value: "disabled", label: "Disabled" },
                ]}
              />

              {/* Image Upload */}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                    setFieldValue("image", e.target.files[0]);
                  }
                }}
                style={{ gridColumn: "1 / -1" }}
              />

              {touched.image && typeof errors.image === "string" && (
                <div style={{ color: "red", gridColumn: "1 / -1" }}>
                  {errors.image}
                </div>
              )}
            </Grid>

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
              >
                Cancel
              </Button>

              <Button
                variant="yellow"
                type="submit"
                w={{ base: "full", md: "20%" }}
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create Ads"}
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AdsForm;
