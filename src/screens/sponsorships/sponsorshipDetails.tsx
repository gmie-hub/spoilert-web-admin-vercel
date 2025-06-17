import { Box, Stack, Tabs, Text } from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { sponsorshipDetailsTabList } from "@spt/utils/sponsorshipData";

import SponsorshipBreakdown from "./tabs/sponsorshipBreakdown";
import SponsorshipOverview from "./tabs/sponsorshipOverview";

const SponsorshipDetails = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Sponsorship Details
          </Text>

          <CustomTabs tabList={sponsorshipDetailsTabList}>
            <>
              <Tabs.Content value="sponsorshipOverview">
                <SponsorshipOverview />
              </Tabs.Content>

              <Tabs.Content value="sponsorshipBreakdown">
                <SponsorshipBreakdown />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Box>
  );
};

export default SponsorshipDetails;
