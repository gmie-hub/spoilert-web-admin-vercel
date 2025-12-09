import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Tabs,
} from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { promotionsManagementTabList } from "@spt/utils/promotionsData";

import Metrics from "./tabs/metrics";
import PromotionManagementOverview from "./tabs/overview";

const PromotionManagementDetails = () => {
  return (
    <Stack>
      <Breadcrumb
        previousLink="Promotions Management"
        currentLink="View Promotion Managetion Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <Flex align="center" justify="space-between" w="100%">
            <Heading size={{ base: "sm", md: "lg" }}>
              Promotion Management Details
            </Heading>

            <HStack gap={3}>
              <Button variant="yellow" flex="1">
                <Image src="/eye.svg" alt="eye" />
                View Tutor's Profile
              </Button>

              <Button variant="yellowOutline" flex="1">
                <Image src="/blue-eye.svg" alt="eye" />
                View Spoil Details
              </Button>
            </HStack>
          </Flex>

          <CustomTabs tabList={promotionsManagementTabList}>
            <>
              <Tabs.Content value="Overview">
                <PromotionManagementOverview />
              </Tabs.Content>

              <Tabs.Content value="Metric">
                <Metrics />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PromotionManagementDetails;