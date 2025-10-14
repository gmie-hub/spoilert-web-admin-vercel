import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Input, SubHeader } from "@spt/components";
import { useChangePasswordMutation } from "@spt/hooks/api/useChangePasswordMutation";
import { validations } from "@spt/utils/validations";

const ChangePassword = () => {
  const { isLoading, changePasswordHandler } = useChangePasswordMutation();

  const contactInitialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const contactValidationSchema = object().shape({
    currentPassword: validations.currentPassword,
    newPassword: validations.newPassword,
    confirmPassword: validations.confirmPassword,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={contactInitialValues}
      onSubmit={(values) => {
        changePasswordHandler(values);
      }}
      validationSchema={contactValidationSchema}
    >
      {() => (
        <Form>
          <Stack gap="6" mb="6">
            <Stack gap="6" mb="4">
              <SubHeader>Change Password</SubHeader>
              <Box w="full">
                <Input
                  name="currentPassword"
                  label="Current Password"
                  placeholder="Input Password"
                  hasAsterisk
                />
              </Box>

              <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="newPassword"
                    label="New Password"
                    placeholder="Input Password"
                    hasAsterisk
                  />
                </Box>
                
                <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
                  <Input
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter Password"
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
                loading={isLoading}
                w={{ base: "full", md: "20%" }}
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Save Changes"}
              </Button>
            </Flex>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassword;
