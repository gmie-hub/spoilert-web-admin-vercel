import { useState } from "react";

import { Stack, Tabs, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import CustomTabs from "@spt/components/tabs";
import { useGetSponsorshipDetailsQuery } from "@spt/hooks/api/useGetSponsorshipDetailsQuery";
import { useGetSponsorshipSummaryQuery } from "@spt/hooks/api/useGetSponsorshipSummaryQuery";
import { sponsorshipDetailsTabList } from "@spt/utils/sponsorshipData";

import SponsorshipBreakdown from "./tabs/sponsorshipBreakdown/sponsorshipBreakdown";
import SponsorshipBreakdownDetails from "./tabs/sponsorshipBreakdown/sponsorshipBreakdownDetails";
import SponsorshipOverview from "./tabs/sponsorshipOverview";

const SponsorshipDetails = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [searchParams] = useSearchParams();

  const sponsorId = searchParams.get("sponsorId");

  const { sponsorshipDetailsData, isLoading, isError, errorMessage } =
    useGetSponsorshipSummaryQuery(Number(sponsorId));

  const {
    sponsorshipBreakdownData,
    isSponsorshipBreakdownError,
    isSponsorshipBreakdownLoading,
    sponsorshipBreakdownErrorMessage,
  } = useGetSponsorshipDetailsQuery(Number(sponsorId));

  const handleShowDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  if (isLoading || isSponsorshipBreakdownLoading) return <LoadingState />;
  if (isError || isSponsorshipBreakdownError)
    return (
      <ErrorState error={errorMessage || sponsorshipBreakdownErrorMessage} />
    );

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Sponsorships"
        currentLink="View Sponsorship Details"
      />

      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Sponsorship Details
          </Text>

          <CustomTabs tabList={sponsorshipDetailsTabList}>
            <>
              <Tabs.Content value="sponsorshipOverview">
                <SponsorshipOverview data={sponsorshipDetailsData?.data[0]} />
              </Tabs.Content>

              <Tabs.Content value="sponsorshipBreakdown">
                {showDetails ? (
                  <SponsorshipBreakdownDetails handleBack={handleShowDetails} />
                ) : (
                  <SponsorshipBreakdown
                    data={sponsorshipBreakdownData?.data}
                    handleNavigate={handleShowDetails}
                  />
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