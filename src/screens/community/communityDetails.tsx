import {
  Button,
  Dialog,
  Flex,
  Image,
  Portal,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import ApprovalModalContent from "@spt/components/approvalModalContent";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import RejectModalContent from "@spt/components/rejectModalContent";
import CustomTabs from "@spt/components/tabs";
import { useGetCommunityDetailsQuery } from "@spt/hooks/api/useGetCommunityDetailsQuery";
import { useGetCommunityPostsQuery } from "@spt/hooks/api/useGetCommunityPostsQuery";
import { useToggleCommunityStatusMutation } from "@spt/hooks/api/useToggleCommunityStatusMutation";
import { routes } from "@spt/routes";
import { useApprovalStore, useRejectionStore } from "@spt/store";
import { communityDetailsTabList } from "@spt/utils/sponsorshipData";

import CommunityOverview from "./tabs/communityOverview";
import CommunityPosts from "./tabs/communityPosts/communityPosts";

const CommunityDetails = () => {
  const id = useSearchParams()[0].get("id");

  const { data, isLoading, isError, errorMessage } =
    useGetCommunityDetailsQuery(Number(id));

  const { postData, isPostLoading, isPostError, postErrorMessage } =
    useGetCommunityPostsQuery();

  const openRejection = useRejectionStore((state) => state.openRejection);
  const setOpenRejection = useRejectionStore((state) => state.setOpenRejection);
  const openApproval = useApprovalStore((state) => state.openApproval);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);
  const { isToggleLoading, toggleCommunityStatusHandler } =
    useToggleCommunityStatusMutation();

  const isDisabled = data?.locked === 1;

  const handleToggleCommunity = () => {
    if (id) {
      toggleCommunityStatusHandler(Number(id), isDisabled);
    }
  };

  const handleModalOpen = () => {
    if (isDisabled) {
      setOpenApproval(true);
    } else {
      setOpenRejection(true);
    }
  };

  if (isLoading || isPostLoading) return <LoadingState />;
  if (isError || isPostError)
    return <ErrorState error={errorMessage || postErrorMessage} />;

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Community"
        currentLink="View Community Details"
      />

      <Card>
        <Stack gap="4">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justifyContent="space-between"
            rowGap="3"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Community Details
            </Text>

            <Button
              variant={isDisabled ? "yellowOutline" : "dangerOutline"}
              color={isDisabled ? "blue.100" : undefined}
              onClick={handleModalOpen}
            >
              <Image
                src={isDisabled ? "/repeat.svg" : "/danger.svg"}
                alt={isDisabled ? "enable" : "disable"}
              />{" "}
              {isDisabled ? "Re-enable Community" : "Disable Community"}
            </Button>
          </Flex>

          <CustomTabs tabList={communityDetailsTabList}>
            <>
              <Tabs.Content value="communityOverview">
                <CommunityOverview data={data} />
              </Tabs.Content>

              <Tabs.Content value="communityPosts">
                <CommunityPosts
                  communityData={data}
                  postData={postData?.data}
                  communityId={Number(id)}
                />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>

      {/* Disable Community Modal */}
      <Dialog.Root
        open={openRejection}
        onOpenChange={(details) => setOpenRejection(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <RejectModalContent
              buttonText="Yes, Disable"
              heading="Disable This Community"
              description="Disabling this community will prevent all members from accessing or engaging in discussions."
              label="Disable"
              placeholder="disabling this community"
              onClose={() => {}}
              onClick={handleToggleCommunity}
              isLoading={isToggleLoading}
              successMessage="Community Disabled Successfully"
              route={routes.main.community.home}
              skipNavigation
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Re-enable Community Modal */}
      <Dialog.Root
        open={openApproval}
        onOpenChange={(details) => setOpenApproval(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <ApprovalModalContent
              buttonText="Yes, Re-enable"
              heading="Re-enable This Community"
              onClick={handleToggleCommunity}
              isLoading={isToggleLoading}
              successMessage="Community Re-enabled Successfully"
              route={routes.main.community.home}
              content="Re-enabling this community will restore access for all members to engage in discussions."
              skipNavigation
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default CommunityDetails;
