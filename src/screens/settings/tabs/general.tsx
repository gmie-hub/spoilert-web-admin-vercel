import { Box, Button, Flex, Separator, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { Input, SubHeader } from "@spt/components";

const General = () => {
  return (
    <Box>
      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Stack gap="6">
            <Stack gap="6" mb="4">
              <SubHeader>Contact Information</SubHeader>

              <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="contactEmailID"
                    label="Contact Email ID"
                    placeholder="Enter the company’s email ID"
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="contactPhoneNumber"
                    label="Contact Phone Number"
                    placeholder="Enter the company’s phone number"
                  />
                </Box>

                <Box w="full">
                  <Input
                    name="contactLocation"
                    label="Contact Location"
                    placeholder="Enter the company’s location"
                  />
                </Box>
              </Flex>
            </Stack>

            <Separator />

            <Stack gap="6" mb="4">
              <SubHeader>Social Media Links</SubHeader>

              <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="facebook"
                    label="Facebook"
                    placeholder="Enter the company’s facebook link"
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="twitter"
                    label="Twitter"
                    placeholder="Enter the company’s twitter link"
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="linkedin"
                    label="LinkedIn"
                    placeholder="Enter the company’s linkedin link"
                  />
                </Box>

                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="instagram"
                    label="Instagram"
                    placeholder="Enter the company’s instagram link"
                  />
                </Box>
              </Flex>
            </Stack>

            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={{ md: "flex-end" }}
              gap={{ base: "3", md: "6" }}
            >
              <Button variant="yellow" w={{ base: "full", md: "20%" }}>
                Save Changes
              </Button>
            </Flex>
          </Stack>
        )}
      </Formik>
    </Box>
  );
};

export default General;