import { Button, HStack, Image, Stack, Tabs, Text } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import CustomTabs from "@spt/components/tabs";
import { useGetCommunityDetailsQuery } from "@spt/hooks/api/useGetCommunityDetailsQuery";
import { communityDetailsTabList } from "@spt/utils/sponsorshipData";

import CommunityOverview from "./tabs/communityOverview";

const CommunityDetails = () => {
  const id = useSearchParams()[0].get("id");

  const { data, isLoading, isError, errorMessage } =
    useGetCommunityDetailsQuery(Number(id));

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Community"
        currentLink="View Community Details"
      />

      <Card>
        <Stack gap="4">
          <HStack justifyContent="space-between">
            <Text fontSize="lg" fontWeight="semibold">
              Community Details
            </Text>

            <Button variant="dangerOutline">
              {<Image src="/trash.svg" alt="delete" />} Disable Community
            </Button>
          </HStack>

          <CustomTabs tabList={communityDetailsTabList}>
            <>
              <Tabs.Content value="communityOverview">
                <CommunityOverview data={data} />
              </Tabs.Content>

              <Tabs.Content value="communityPosts"></Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default CommunityDetails;
