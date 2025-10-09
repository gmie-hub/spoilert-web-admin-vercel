import type { FC } from "react";

import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Input, SubHeader } from "@spt/components";
import { useUpdateSettingsMutation } from "@spt/hooks/api/useUpdateSettingsMutation";
import type { Metadata2 } from "@spt/types/settings";
import { validations } from "@spt/utils/validations";

interface ContactInfoProps {
  contactInfoData: Metadata2;
  id: number;
}

const ContactInfo: FC<ContactInfoProps> = ({ contactInfoData, id }) => {
  const { isUpdateLoading, updateSettingsHandler } =
    useUpdateSettingsMutation(id);

  const contactInitialValues = {
    contactEmailID: contactInfoData?.contact_email_id || "",
    contactPhoneNumber: contactInfoData?.contact_phone_number || "",
    contactLocation: contactInfoData?.contact_location?.toString() || "",
  };

  const contactValidationSchema = object().shape({
    contactEmailID: validations.contactEmailID,
    contactPhoneNumber: validations.contactPhoneNumber,
    contactLocation: validations.contactLocation,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={contactInitialValues}
      onSubmit={(values) => {
        updateSettingsHandler(values);
      }}
      validationSchema={contactValidationSchema}
    >
      {() => (
        <Form>
          <Stack gap="6" mb="6">
            <Stack gap="6" mb="4">
              <SubHeader>Contact Information</SubHeader>

              <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="contactEmailID"
                    label="Contact Email ID"
                    placeholder="Enter the company’s email ID"
                    hasAsterisk
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="contactPhoneNumber"
                    label="Contact Phone Number"
                    placeholder="Enter the company’s phone number"
                    hasAsterisk
                  />
                </Box>

                <Box w="full">
                  <Input
                    name="contactLocation"
                    label="Contact Location"
                    placeholder="Enter the company’s location"
                    hasAsterisk
                  />
                </Box>
              </Flex>
            </Stack>

            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={{ md: "flex-end" }}
              gap={{ base: "3", md: "6" }}
            >
              <Button
                type="submit"
                variant="yellow"
                loading={isUpdateLoading}
                w={{ base: "full", md: "20%" }}
              >
                Save Changes
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ContactInfo;
