import { HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";

import { Breadcrumb, Card, Modal } from "@spt/components";
import CustomTabs from "@spt/components/tabs";

import SpoilOutline from "./tabs/spoilOutline";
import SpoilOverview from "./tabs/spoilOverview";

const SpoilDetails = () => {
  return (
    <Stack>
      <Breadcrumb previousLink="Spoil Management" currentLink="View Spoil Details" />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Spoil Details</Heading>

            <Modal
              buttonIcon={<Image src="/danger.svg" alt="delete" />}
              buttonText="Disable Spoil"
              variant="dangerOutline"
            >
              {/* <DeleteAccountModalContent /> */}
            </Modal>
          </HStack>

          <CustomTabs tabList={tabList}>
            <>
              <Tabs.Content value="spoilOverview">
                <SpoilOverview />
              </Tabs.Content>

              <Tabs.Content value="spoilOutline">
                <SpoilOutline />
              </Tabs.Content>

              <Tabs.Content value="spoilQuiz">
                {/* <SponsorshipUsed /> */}
              </Tabs.Content>
              <Tabs.Content value="spoilReviews">
                {/* <SponsorshipUsed /> */}
              </Tabs.Content>
              <Tabs.Content value="enrolledLearners">
                {/* <SponsorshipUsed /> */}
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SpoilDetails;

const tabList = [
  {
    value: "spoilOverview",
    text: "Spoil Overview",
  },
  {
    value: "spoilOutline",
    text: "Spoils Outline",
  },
  {
    value: "spoilQuiz",
    text: "Spoil Quiz & Leaderboard",
  },
  {
    value: "spoilReviews",
    text: "Spoil Reviews",
  },
  {
    value: "enrolledLearners",
    text: "Enrolled Learners",
  },
];