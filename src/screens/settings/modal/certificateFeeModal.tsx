import type { FC } from "react";

import { Button, Dialog, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Input } from "@spt/components";
import { useUpdateSettingsMutation } from "@spt/hooks/api/useUpdateSettingsMutation";
import { validations } from "@spt/utils/validations";

interface ComponentProps {
  hasCertFee: boolean;
  certFee: string;
  id: number;
}

const CertificateFeeModalContent: FC<ComponentProps> = ({
  hasCertFee,
  certFee,
  id,
}) => {
  const { isUpdateLoading, updateSettingsHandler } =
    useUpdateSettingsMutation(id);

  const validationSchema = object().shape({
    certificateFee: validations.certificateFee,
  });

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>
          {`${hasCertFee ? "Edit" : "Set"}`} Certificate Fee
        </Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Formik
          initialValues={{ certificateFee: certFee || "" }}
          onSubmit={(values) => {
            updateSettingsHandler(values);
          }}
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

                  <Button type="submit" variant="yellow" loading={isUpdateLoading} w="50%">
                    Save {hasCertFee && " Changes"}
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