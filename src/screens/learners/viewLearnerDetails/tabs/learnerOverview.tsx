import React from "react";

import { Box, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { firstDetails } from "@spt/utils/learnerData";

const LearnerOverview: React.FC = () => {
  return (
    <Stack mt="5">
      <Stack gap="6">
        <Box>
          <Image src="/user-icon.svg" alt="user" boxSize="14" />
        </Box>

        <ProgressInfo>
          {firstDetails.map((item, index) => (
            <InfoDisplay title={item.title} value={item.value} key={index} />
          ))}
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Date Joined" value="12-02-2025" />
          <InfoDisplay title="Last Login" value="21-02-2025" />
          <InfoDisplay title="Status" value="" status="Active" />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default LearnerOverview;
