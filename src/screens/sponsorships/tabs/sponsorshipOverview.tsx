import React from "react";

import { Box, Button, HStack, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { sponsorshipOverviewDetails } from "@spt/utils/sponsorshipData";

const SponsorshipOverview: React.FC = () => {
  return (
    <Stack mt="5">
      <Stack gap="6">
        <HStack justifyContent="space-between" alignItems="center">
          <Box>
            <Image src="/user-icon.svg" alt="user" boxSize="14" />
          </Box>

          <Button variant="yellowOutline">View Full Profile</Button>
        </HStack>

        <ProgressInfo>
          {sponsorshipOverviewDetails.map((item, index) => (
            <InfoDisplay title={item.title} value={item.value} key={index} />
          ))}
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Total Spoils Sponsored" value="5" />
          <InfoDisplay title="Total Learners Sponsored" value="15" />
          <InfoDisplay title="Status" value="" status="Active" />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default SponsorshipOverview;
