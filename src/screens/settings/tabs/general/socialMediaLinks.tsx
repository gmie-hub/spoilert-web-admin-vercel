import type { FC } from "react";

import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Input, SubHeader } from "@spt/components";
import { useUpdateSettingsMutation } from "@spt/hooks/api/useUpdateSettingsMutation";
import type { Metadatum } from "@spt/types/settings";
import { validations } from "@spt/utils/validations";

interface SocialMediaLinksProps {
  socialMediaData: Metadatum;
  id: number;
}

const SocialMediaLinks: FC<SocialMediaLinksProps> = ({
  id,
  socialMediaData,
}) => {
  const { isUpdateLoading, updateSettingsHandler } =
    useUpdateSettingsMutation(id);

  const socialInitialValues = {
    facebook: socialMediaData?.facebook || "",
    twitter: socialMediaData?.twitter || "",
    instagram: socialMediaData?.instagram || "",
    linkedin: socialMediaData?.linkedin || "",
  };

  const socialValidationSchema = object().shape({
    facebook: validations.facebook,
    instagram: validations.instagram,
    twitter: validations.twitter,
    linkedin: validations.linkedin,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={socialInitialValues}
      onSubmit={(values) => {
        updateSettingsHandler(values);
      }}
      validationSchema={socialValidationSchema}
    >
      {() => (
        <Form>
          <Stack gap="6">
            <Stack gap="6" mb="4">
              <SubHeader>Social Media Links</SubHeader>

              <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="facebook"
                    label="Facebook"
                    placeholder="Enter the company’s facebook link"
                    hasAsterisk
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="twitter"
                    label="Twitter"
                    placeholder="Enter the company’s twitter link"
                    hasAsterisk
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="linkedin"
                    label="LinkedIn"
                    placeholder="Enter the company’s linkedin link"
                    hasAsterisk
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="instagram"
                    label="Instagram"
                    placeholder="Enter the company’s instagram link"
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

export default SocialMediaLinks;