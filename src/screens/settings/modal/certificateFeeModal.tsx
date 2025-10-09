import { Button, Dialog, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Input } from "@spt/components";
import { useEditStore } from "@spt/store";
import { validations } from "@spt/utils/validations";

const CertificateFeeModalContent = () => {
  const isEdit = useEditStore((state) => state.isEdit);

  const validationSchema = object().shape({
    certificateFee: validations.certificateFee,
  });

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>
          {`${isEdit ? "Edit" : "Set"}`} Certificate Fee
        </Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Formik
          initialValues={{}}
          onSubmit={() => {}}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form>
              <Stack gap="8">
                <Input
                  name="certificateFee"
                  label="Certificate Fee"
                  placeholder="Enter amount"
                />

                <Flex
                  direction={{ base: "column", md: "row" }}
                  w="full"
                  gap="5"
                  justifyContent="center"
                  mt="3"
                >
                  <Dialog.ActionTrigger asChild>
                    <Button variant="yellowOutline" w="50%">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>

                  <Button variant="yellow" w="50%">
                    Save {isEdit && " Changes"}
                  </Button>
                </Flex>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default CertificateFeeModalContent;
