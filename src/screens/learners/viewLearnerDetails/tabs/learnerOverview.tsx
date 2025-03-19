import React from "react";

import { Box, HStack, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import { firstDetails } from "@spt/utils/learnerData";

const LearnerOverview: React.FC = () => {
  return (
    <Stack mt="5">
      <Stack>
        <Box>
          <Image src="/user-icon.svg" alt="user" />
        </Box>

        <HStack justifyContent="space-between">
          {firstDetails.map((item) => (
            <InfoDisplay title={item.title} value={item.value} />
          ))}
        </HStack>
      </Stack>
    </Stack>
  );
};

export default LearnerOverview;
