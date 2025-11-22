import { Box, Button, HStack, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { SponsorshipsDatum } from "@spt/types/sponsorship";

const SponsorshipOverview = ({ data }: { data: SponsorshipsDatum }) => {
  const sponsorshipOverviewDetails = [
    { title: "Name of Sponsor", value: data?.sponsor_name },
    { title: "Email Address", value: data?.sponsor_email },
    { title: "Total Amount Sponsored", value: `₦${data?.total_amount}` },
  ];

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
          <InfoDisplay
            title="Total Spoils Sponsored"
            value={data?.total_spoils_sponsored}
          />
          <InfoDisplay
            title="Total Learners Sponsored"
            value={data?.total_learners_sponsored}
          />
          <InfoDisplay title="Status" value="" status="Active" />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default SponsorshipOverview;
