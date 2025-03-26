import { useCallback, useState } from "react";

import { Button, HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";

import LearnerOverview from "./tabs/learnerOverview";
import ProgressDetails from "./tabs/progressDetails";
import SpoilsEnrolled from "./tabs/spoilsEnrolled";

const ViewLearnerDetails = () => {
  const [selectSpoil, setSelectSpoil] = useState("null");

  const handleViewDetails = useCallback((item: any) => {
    setSelectSpoil(item);
  }, []);

  const handleBackToTable = useCallback(() => {
    setSelectSpoil("null");
  }, []);

  return (
    <Stack>
      <Breadcrumb previousLink="Learners" currentLink="View Learner Details" />

      <Card>
        <Stack mb="12" gap={{ mdDown: "6", md: "4" }} mx="5">
          <HStack justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Learner Details</Heading>

            <Button dangerOutline px={{ base: "2", md: "8" }}>
              <Image src="/trash.svg" alt="delete" /> Delete Account
            </Button>
          </HStack>

          <CustomTabs tabList={tabList}>
            <>
              <Tabs.Content value="learnerOverview">
                <LearnerOverview />
              </Tabs.Content>

              <Tabs.Content value="spoilsEnrolled">
                {selectSpoil ? (
                  <SpoilsEnrolled onClick={handleViewDetails} />
                ) : (
                  <ProgressDetails handleNavigation={handleBackToTable} />
                )}
              </Tabs.Content>

              <Tabs.Content value="sponsorshipUsed"></Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ViewLearnerDetails;

const tabList = [
  {
    value: "learnerOverview",
    text: "Learner Overview",
  },
  {
    value: "spoilsEnrolled",
    text: "Spoils Enrolled & Progress",
  },
  {
    value: "sponsorshipUsed",
    text: "Sponsorship Used",
  },
];