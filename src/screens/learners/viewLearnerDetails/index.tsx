import { useCallback, useState } from "react";

import { HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";

import { Breadcrumb, Card, Modal } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import ProgressDetails from "@spt/partials/progressDetails";

import DeleteAccountModalContent from "../modal/deleteAccountModalContent";

import LearnerOverview from "./tabs/learnerOverview";
import SpoilsEnrolled from "./tabs/spoilsEnrolled";
import SponsorshipUsed from "./tabs/sponsorshipUsed";

const ViewLearnerDetails = () => {
  const [selectSpoil, setSelectSpoil] = useState("null");

  const handleViewDetails = useCallback((item: any) => {
    setSelectSpoil(item);
  }, []);

  const handleBackToTable = useCallback(() => {
    setSelectSpoil(null);
  }, []);

  return (
    <Stack>
      <Breadcrumb previousLink="Learners" currentLink="View Learner Details" />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Learner Details</Heading>

            <Modal
              buttonIcon={<Image src="/trash.svg" alt="delete" />}
              buttonText="Delete Account"
              variant="dangerOutline"
            >
              <DeleteAccountModalContent />
            </Modal>
          </HStack>

          <CustomTabs tabList={tabList}>
            <>
              <Tabs.Content value="learnerOverview">
                <LearnerOverview />
              </Tabs.Content>

              <Tabs.Content value="spoilsEnrolled">
                {selectSpoil === null ? (
                  <SpoilsEnrolled onClick={handleViewDetails} />
                ) : (
                  <ProgressDetails handleBack={handleBackToTable}  />
                )}
              </Tabs.Content>

              <Tabs.Content value="sponsorshipUsed">
                <SponsorshipUsed />
              </Tabs.Content>
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
