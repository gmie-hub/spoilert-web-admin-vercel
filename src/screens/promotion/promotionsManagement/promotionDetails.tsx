import { Button, Flex, HStack, Heading, Stack, Tabs } from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
// import LoadingState from "@spt/components/loadingState";
import CustomTabs from "@spt/components/tabs";
// import { useSpoilDetailsQuery } from "@spt/hooks/api/useSpoilDetailsQuery";
import { promotionsManagementTabList } from "@spt/utils/spoilData";

// import Metrics from "./tabs/spoilOutline";
// import PromotionOverview from "./tabs/overview";

const PromotionManagementDetails = () => {
  // const { data, isLoading } = useSpoilDetailsQuery(Number(id));

  // if (isLoading) return <LoadingState />;

  return (
    <Stack>
      <Breadcrumb
        previousLink="Promotions Management"
        currentLink="View Promotion Managetion Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          {/* <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>
              Promotion Management Details
            </Heading>
          </HStack> */}
          <Flex align="center" justify="space-between" w="100%">
            {/* Left: Heading */}
            <Heading size={{ base: "sm", md: "lg" }}>
              Promotion Management Details
            </Heading>

            {/* Right: Two buttons */}
            <HStack gap={3}>
              <Button variant="yellowOutline" flex="1">
                View Tutor's Profile
              </Button>

              <Button variant="yellowOutline" flex="1">
                View Spoil Details
              </Button>
            </HStack>
          </Flex>

          <CustomTabs tabList={promotionsManagementTabList}>
            <>
              <Tabs.Content value="Overview">
                {/* <PromotionOverview data={} /> */}
              </Tabs.Content>

              {/* <Tabs.Content value="Metrics">
                <Metrics data={data}  />
              </Tabs.Content> */}
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PromotionManagementDetails;
