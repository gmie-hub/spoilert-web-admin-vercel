import { HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";

import { Breadcrumb, Card, Modal } from "@spt/components";
import CustomTabs from "@spt/components/tabs";

import TutorOverview from "./tabs/tutorOverview/tutorOverview";

const TutorDetails = () => {
  return (
    <Stack>
      <Breadcrumb previousLink="Tutors" currentLink="View Tutor Details" />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Learner Details</Heading>

            <Modal
              buttonIcon={<Image src="/trash.svg" alt="delete" />}
              buttonText="Delete Account"
              variant="dangerOutline"
              dialogHeader="Delete Account"
            >
              {/* <DeleteAccountModalContent /> */}
            </Modal>
          </HStack>

          <CustomTabs tabList={tabList}>
            <>
              <Tabs.Content value="tutorOverview">
                <TutorOverview />
              </Tabs.Content>

              {/* <Tabs.Content value="spoilsEnrolled">
                {selectSpoil === null ? (
                  <SpoilsEnrolled onClick={handleViewDetails} />
                ) : (
                  <ProgressDetails handleNavigation={handleBackToTable} />
                )}
              </Tabs.Content> */}

              {/* <Tabs.Content value="sponsorshipUsed">
                <SponsorshipUsed />
              </Tabs.Content> */}
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default TutorDetails;

const tabList = [
  {
    value: "tutorOverview",
    text: "Tutor Overview",
  },
  {
    value: "spoilsCreated",
    text: "Spoils Created",
  },
  {
    value: "transactions",
    text: "Transactions",
  },
];
