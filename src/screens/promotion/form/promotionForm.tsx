import { Button, Flex, HStack, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { Input, Select } from "@spt/components";
import { useSuccessStore } from "@spt/store";

const PromotionForm = () => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  return (
    <Formik initialValues={{}} onSubmit={() => setOpenSuccess(true)}>
      {() => (
        <Form>
          <Stack gap="6">
            <HStack gap="6">
              <Input
                name="promotionName"
                label="Promotion Name"
                placeholder="Enter the promotion name"
              />

              <Select
                name="duration"
                label="Duration"
                placeholder="Select the duration for the promotion"
              />
            </HStack>

            <Input
              name="amount"
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
              >
                Cancel
              </Button>

              <Button
                variant="yellow"
                type="submit"
                w={{ base: "full", md: "20%" }}
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default PromotionForm;
