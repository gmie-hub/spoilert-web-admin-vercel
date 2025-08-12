import { lazy, useCallback, useState } from "react";

import { HStack, Heading, Image, Stack, Tabs, Text } from "@chakra-ui/react";

import { Breadcrumb, Card, Modal } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { spoilReviewTabList } from "@spt/utils/spoilData";

import SpoilOutline from "./tabs/spoilOutline";
import SpoilOverview from "./tabs/spoilOverview";
import SpoilQuiz from "./tabs/spoilQuiz";
import SpoilReviews from "./tabs/spoilReviews";
import ApprovalModalContent from "@spt/components/approvalModalContent";

const ProgressDetails = lazy(() => import("@spt/partials/progressDetails"));

const SpoilReviewDetails = () => {
  const [toggleEnrolledLearners, setToggleEnrolledLearners] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const [openEnableModal, setOpenEnableModal] = useState(false);

  const handleDisableModal = (e: any) => setOpenDisableModal(e.open);
  const handleEnableModal = (e: any) => setOpenEnableModal(e.open);

  const handleCloseDisableModal = () => setOpenDisableModal(false);
  const handleCloseEnableModal = () => setOpenEnableModal(false);

  const handleToggleEnrolledLearners = useCallback(() => {
    setToggleEnrolledLearners(!toggleEnrolledLearners);
  }, [toggleEnrolledLearners]);

  const handleDisableOrEnableSpoil = useCallback(() => {
    setIsDisabled((prevState) => !prevState);
    handleCloseEnableModal();
    handleCloseDisableModal();
  }, []);

  return (
    <Stack>
      <Breadcrumb
        previousLink="Spoil Review"
        currentLink="View Spoil Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Spoil Details</Heading>

            {/* <Modal
              open={isDisabled ? openEnableModal : openDisableModal}
              onOpenChange={isDisabled ? handleEnableModal : handleDisableModal}
              buttonIcon={
                <Image
                  src={isDisabled ? "/repeat.svg" : "/danger.svg"}
                  alt="delete"
                />
              }
              buttonText={isDisabled ? "Re-enable Spoil" : "Disable Spoil"}
              variant={isDisabled ? "yellowOutline" : "dangerOutline"}
            >
              {isDisabled ? (
                <ApprovalModalContent onClick={handleDisableOrEnableSpoil} />
              ) : (
                <DisableSpoilModalContent
                  onClick={handleDisableOrEnableSpoil}
                />
              )}
            </Modal> */}
          </HStack>

          {isDisabled && (
            <HStack
              border="1px solid #A7E1FB"
              bg="#E0F4FD"
              py="2"
              px="3"
              borderRadius="lg"
              alignItems="center"
            >
              <Image src="/info.svg" alt="info" />
              <Text color="blue.100">
                This spoil has been disabled, you can enable it by clicking on
                the button that says{" "}
                <Text as="span" fontWeight="semibold">
                  “Re-enable spoil”
                </Text>
              </Text>
            </HStack>
          )}

          <CustomTabs tabList={spoilReviewTabList}>
            <>
              <Tabs.Content value="spoilOverview">
                <SpoilOverview />
              </Tabs.Content>

              <Tabs.Content value="spoilOutline">
                <SpoilOutline />
              </Tabs.Content>

              <Tabs.Content value="spoilQuiz">
                <SpoilQuiz />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SpoilReviewDetails;
