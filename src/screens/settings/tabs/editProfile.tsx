import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";

import { Input, SubHeader } from "@spt/components";

const EditProfile = () => {
  return (
    <Stack gap="6">
      <SubHeader>
        Edit profile
      </SubHeader>

      <Image src="/user-icon.svg" alt="info" h="60px" w="60px" />

      <Box>
        <Formik initialValues={{}} onSubmit={() => {}}>
          {() => (
            <Flex direction={{ base: "column", md: "row" }} gap="6">
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Enter full name"
              />

              <Input
                name="email"
                label="Email Address"
                placeholder="Enter email address"
              />
            </Flex>
          )}
        </Formik>
      </Box>

      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent={{ md: "flex-end" }}
        gap={{ base: "3", md: "6"}}
        mt="3"
      >
        <Button variant="yellowOutline" w={{ base: "full", md: "20%"}}>Cancel</Button>
        <Button variant="yellow" w={{ base: "full", md: "20%"}}>Save Changes</Button>
      </Flex>
    </Stack>
  );
};

export default EditProfile;
