import { useCallback, useState } from "react";

import { HStack, Heading, Image, Stack, Tabs } from "@chakra-ui/react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card, Modal } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import CustomTabs from "@spt/components/tabs";
import { useDeleteUserMutation } from "@spt/hooks/api/useDeleteUserMutation";
import ProgressDetails from "@spt/partials/progressDetails";
import { routes } from "@spt/routes";
import { tutorTabList } from "@spt/utils/tutorData";

import EarningBreakdown from "./tabs/earningBreakdown";
import EnrolledLearners from "./tabs/enrolledLearners";
import SpoilDetails from "./tabs/spoilDetails";
import SpoilsCreated from "./tabs/spoilsCreated";
import Transactions from "./tabs/transactions";
import TutorOverview from "./tabs/tutorOverview/tutorOverview";

const TutorDetails = () => {
  const [, setSelectSpoil] = useState(null);
  const [currentTab, setCurrentTab] = useState("spoilsCreated");
  const { isDeleteLoading, deleteUserHandler } = useDeleteUserMutation();
  const { id } = useParams();

  const navigate = useNavigate();


  
  const handleNavigate = () => {
    const path = generatePath(routes.main.learners.viewDetails, { id });
    navigate(path);
  };
  
  const handleViewDetails = useCallback((item: any) => {
    setSelectSpoil(item);
    const path = generatePath(routes.main.tutors.tutorDetails, {
      id: id,
      spoil_id: item?.id,
    });
    navigate(path);
    setCurrentTab("spoilDetails");
  }, []);

  const handleViewEnrolled = useCallback(() => {
    setCurrentTab("enrolledLearners");
  }, []);

  const handleViewProgressDetails = useCallback(() => {
    setCurrentTab("progressDetails");
  }, []);

  const handleBackToTable = useCallback(() => {
    setSelectSpoil(null);

    setCurrentTab("spoilsCreated");

    const path = generatePath(routes.main.tutors.tutorDetails, {
      id: id,
    });
    navigate(path);
  }, []);

  const handleBackToSpoilDetails = useCallback(() => {
    setCurrentTab("spoilDetails");
  }, []);

  const handleBackToEnrolledLearners = useCallback(() => {
    setCurrentTab("enrolledLearners");
  }, []);

  const displayTabChid = (currentTab: string) => {
    switch (currentTab) {
      case "spoilsCreated":
        return <SpoilsCreated onClick={handleViewDetails} />;
      case "spoilDetails":
        return (
          <SpoilDetails
            handleNavigation={handleBackToTable}
            handleViewEnrolled={handleViewEnrolled}
          />
        );
      case "enrolledLearners":
        return (
          <EnrolledLearners
            handleBack={handleBackToSpoilDetails}
            onClick={handleViewProgressDetails}
          />
        );
      case "progressDetails":
        return (
          <ProgressDetails
            handleBack={handleBackToEnrolledLearners}
            showButton
            handleNavigation={handleNavigate}
          />
        );
    }
  };

  return (
    <Stack>
      <Breadcrumb
        previousLink="Tutors"
        currentLink="View Tutor Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Tutor Details</Heading>

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

          <CustomTabs tabList={tutorTabList}>
            <>
              <Tabs.Content value="tutorOverview">
                <TutorOverview />
              </Tabs.Content>

              <Tabs.Content value="spoilsCreated">
                {displayTabChid(currentTab)}
              </Tabs.Content>

              <Tabs.Content value="earningBreakdown">
                <EarningBreakdown />
              </Tabs.Content>

              <Tabs.Content value="transactions">
                <Transactions />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default TutorDetails;
