import { Button, Flex, Grid, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { Input, Select } from "@spt/components";
import { useSuccessStore } from "@spt/store";

const AdsForm = () => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  return (
    <Formik initialValues={{}} onSubmit={() => setOpenSuccess(true)}>
      {() => (
        <Form>
          <Stack gap="6">
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              <Input name="title" label="Title" placeholder="Enter ads title" />
              <Input name="url" label="URL" placeholder="Enter the url" />

              <Select
                name="category"
                label="Category"
                placeholder="Select category"
              />
              <Select
                name="adSize"
                label="Ad Size"
                placeholder="Select Ad size"
              />
              <Input
                type="date"
                name="startDate"
                label="Start Date"
                placeholder="Select start date"
              />
              <Input
                type="date"
                name="endDate"
                label="End Date"
                placeholder="Select end date"
              />
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
              >
                Create Ads
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AdsForm;