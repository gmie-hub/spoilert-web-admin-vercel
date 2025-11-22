import { Box, Button, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, ImageModal, Modal } from "@spt/components";
import ApprovalModalContent from "@spt/components/approvalModalContent";
import LoadingState from "@spt/components/loadingState";
import RejectModalContent from "@spt/components/rejectModalContent";
import { useApproveKYCMutation } from "@spt/hooks/api/useApproveKYCMutation";
import { usePendingVerificationQuery } from "@spt/hooks/api/usePendingVerificationQuery";
import { useRejectKYCMutation } from "@spt/hooks/api/useRejectKYCMutation";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import { useApprovalStore, useRejectionStore } from "@spt/store";
import { formatDate, formatTime } from "@spt/utils/dateTime";

const VerificationDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = usePendingVerificationQuery(Number(id));
  const { isApprovalLoading, approveKYCHandler } = useApproveKYCMutation(
    Number(id)
  );
  const { isRejectLoading, rejectKYCHandler } = useRejectKYCMutation(Number(id));

  const openApproval = useApprovalStore((state) => state.openApproval);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);

  const openRejection = useRejectionStore((state) => state.openRejection);
  const setOpenRejection = useRejectionStore((state) => state.setOpenRejection);

  const firstDetails = [
    {
      title: "Full Name",
      value: `${data?.user?.first_name} ${data?.user?.last_name}`,
    },
    { title: "Email Address", value: data?.user?.email },
    { title: "Country", value: "Nigeria" },
    // { title: "ID Type", value: data?.type },
  ];

  if (isLoading) return <LoadingState />;

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Pending Verification"
        currentLink="View Verification Details"
      />

      <Card>
        <Stack>
          <Stack gap={{ base: "6", md: "4" }}>
            <Flex
              direction={{ base: "column", md: "row" }}
              alignItems={{ md: "center" }}
              justifyContent="space-between"
              rowGap="4"
            >
              <Heading size={{ base: "md", md: "lg" }}>
                Verification Details
              </Heading>

              <Button
                variant="yellowOutline"
                px="10"
                w={{ base: "fit-content" }}
              >
                View Full Profile
              </Button>
            </Flex>
          </Stack>

          <Stack mt="5">
            <Stack gap="6">
              <Box>
                <Image src="/user-icon.svg" alt="user" boxSize="14" />
              </Box>

              <ProgressInfo>
                {firstDetails.map((item, index) => (
                  <InfoDisplay
                    title={item.title}
                    value={item.value}
                    key={index}
                  />
                ))}
              </ProgressInfo>

              <ProgressInfo>
                <InfoDisplay title="ID Type" value={data?.type} />
                <InfoDisplay
                  title="Date and Time"
                  value={`${formatDate(data?.created_at)} | ${formatTime(data?.created_at)}`}
                />

                <Box flex={{ base: "0 0 50%", md: "0 0 25%" }}>
                  <ImageModal url={data?.url} />
                </Box>
              </ProgressInfo>
            </Stack>
          </Stack>

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
                buttonText="Yes, Reject Verification"
                heading="Reject This Verification"
                description="This action cannot be undone"
                label="Rejection"
                placeholder="rejecting this verification"
                onClose={() => {}}
                isLoading={isRejectLoading}
                rejectHandler={rejectKYCHandler}
                successMessage="Verification Rejected Successfully"
                route={routes.main.pendingVerification.home}
                showForm
              />
            </Modal>

            <Modal
              buttonText="Approve Verification"
              variant="yellow"
              open={openApproval}
              onOpenChange={(e) => setOpenApproval(e.open)}
              isLoading={isApprovalLoading}
            >
              <ApprovalModalContent
                heading="Approve This Verification"
                buttonText="Yes, Approve"
                onClick={approveKYCHandler}
                isLoading={isApprovalLoading}
                successMessage="Verification Approved Successfully"
                route={routes.main.pendingVerification.home}
              />
            </Modal>
          </Flex>
        </Stack>
      </Card>
    </Stack>
  );
};

export default VerificationDetails;
