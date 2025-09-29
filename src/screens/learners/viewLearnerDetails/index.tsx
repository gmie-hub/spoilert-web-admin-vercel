import { useCallback, useState } from "react";

import { HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card, Modal } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import CustomTabs from "@spt/components/tabs";
import { useDeleteUserMutation } from "@spt/hooks/api/useDeleteUserMutation";
import ProgressDetails from "@spt/partials/progressDetails";
import { routes } from "@spt/routes";

import LearnerOverview from "./tabs/learnerOverview";
import SpoilsEnrolled from "./tabs/spoilsEnrolled";
import SponsorshipUsed from "./tabs/sponsorshipUsed";

const ViewLearnerDetails = () => {
  const [selectSpoil, setSelectSpoil] = useState(null);
  const { isDeleteLoading, deleteUserHandler } = useDeleteUserMutation();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleViewDetails = useCallback((item: any) => {
    setSelectSpoil(item);
    const path = generatePath(routes.main.learners.viewDetails, {
      id: id,
      spoil_id: item?.spoil_id,
    });
    navigate(path);
  }, []);

  const handleBackToTable = useCallback(() => {
    setSelectSpoil(null);
    const path = generatePath(routes.main.learners.viewDetails, { id: id });
    navigate(path);
  }, []);

  return (
    <Stack>
      <Breadcrumb
        previousLink="Learners"
        currentLink="View Learner Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Learner Details</Heading>

            <Modal
              buttonIcon={<Image src="/trash.svg" alt="delete" />}
              buttonText="Delete Account"
              variant="dangerOutline"
            >
              <DeleteModalContent
                disabled={isDeleteLoading}
                handleClick={() => deleteUserHandler(parseInt(id))}
                text={"User?"}
              />
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
                  <ProgressDetails handleBack={handleBackToTable} />
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
