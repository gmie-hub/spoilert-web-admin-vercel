import { Box, Flex, Stack } from "@chakra-ui/react";

import UserDetails from "./userDetails";
import UserInfo from "./userInfo";

const TutorOverview = () => {
  return (
    <Stack mt="5">
      <Flex flexDir={{ base: "column", md: "row" }} gap="10">
        <Box flex="2">
          <UserInfo />
        </Box>

        <Box flex="1">
          <UserDetails />
        </Box>
      </Flex>
    </Stack>
  );
};

export default TutorOverview;
