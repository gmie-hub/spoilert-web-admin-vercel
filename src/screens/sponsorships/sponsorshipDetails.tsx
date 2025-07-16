import { useState } from "react";

import { Stack, Tabs, Text } from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { sponsorshipDetailsTabList } from "@spt/utils/sponsorshipData";

import SponsorshipBreakdown from "./tabs/sponsorshipBreakdown/sponsorshipBreakdown";
import SponsorshipBreakdownDetails from "./tabs/sponsorshipBreakdown/sponsorshipBreakdownDetails";
import SponsorshipOverview from "./tabs/sponsorshipOverview";

const SponsorshipDetails = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <Stack gap="4">
      <Breadcrumb previousLink="Sponsorships" currentLink="View Sponsorship Details" showBackButton />
      
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
                {showDetails ? (
                  <SponsorshipBreakdownDetails handleBack={handleShowDetails} />
                ) : (
                  <SponsorshipBreakdown handleNavigate={handleShowDetails} />
                )}
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SponsorshipDetails;
