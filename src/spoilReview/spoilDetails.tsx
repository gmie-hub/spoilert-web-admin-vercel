import { Flex, HStack, Heading, Stack, Tabs } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, Modal } from "@spt/components";
import ApprovalModalContent from "@spt/components/approvalModalContent";
import LoadingState from "@spt/components/loadingState";
import RejectModalContent from "@spt/components/rejectModalContent";
import CustomTabs from "@spt/components/tabs";
import { useApproveSpoilMutation } from "@spt/hooks/api/useApproveSpoilMutation";
import { useRejectSpoilMutation } from "@spt/hooks/api/useRejectSpoilMutation";
import { useSpoilDetailsQuery } from "@spt/hooks/api/useSpoilDetailsQuery";
import { routes } from "@spt/routes";
import { useApprovalStore, useRejectionStore } from "@spt/store";
import { spoilReviewTabList } from "@spt/utils/spoilData";

import SpoilOutline from "./tabs/spoilOutline";
import SpoilOverview from "./tabs/spoilOverview";
import SpoilQuiz from "./tabs/spoilQuiz";

const SpoilReviewDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useSpoilDetailsQuery(Number(id));
  const { isRejectSpoilLoading, rejectSpoilHandler } = useRejectSpoilMutation(
    Number(id)
  );
  const { isApprovalLoading, approveSpoilHandler } = useApproveSpoilMutation(Number(id));

  const openApproval = useApprovalStore((state) => state.openApproval);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);

  const openRejection = useRejectionStore((state) => state.openRejection);
  const setOpenRejection = useRejectionStore((state) => state.setOpenRejection);

  if (isLoading) return <LoadingState />;

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
          </HStack>

          <CustomTabs tabList={spoilReviewTabList}>
            <>
              <Tabs.Content value="spoilOverview">
                <SpoilOverview data={data} />
              </Tabs.Content>

              <Tabs.Content value="spoilOutline">
                <SpoilOutline data={data}  />
              </Tabs.Content>

              <Tabs.Content value="spoilQuiz">
                <SpoilQuiz id={Number(id)} />
              </Tabs.Content>
            </>
          </CustomTabs>

          <Flex
            direction={{ base: "column", md: "row" }}
            mt="6"
            gap="5"
            justifyContent="flex-end"
          >
            <Modal
              open={openRejection}
              onOpenChange={(e) => setOpenRejection(e.open)}
              buttonText="Reject Verification"
              variant="dangerOutline"
            >
              <RejectModalContent
                buttonText="Yes, Reject Spoil"
                heading="Reject This Spoil"
                description="Let the user know why you’re rejecting this spoil"
                label="Rejection"
                placeholder="rejecting this spoil"
                onClose={() => {}}
                successMessage="Spoil Has Been Successfully Rejected"
                rejectHandler={rejectSpoilHandler}
                isLoading={isRejectSpoilLoading}
                route={routes.main.spoilReview.home}
              />
            </Modal>

            <Modal
              buttonText="Approve Spoil"
              variant="yellow"
              open={openApproval}
              onOpenChange={(e) => setOpenApproval(e.open)}
            >
              <ApprovalModalContent
                heading="Approve This Spoil"
                buttonText="Yes, Approve"
                onClick={approveSpoilHandler}
                isLoading={isApprovalLoading}
                route={routes.main.spoilReview.home}
                successMessage="Spoil Approved Successfully"
              />
            </Modal>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SpoilReviewDetails;