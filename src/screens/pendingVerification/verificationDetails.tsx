import React from "react";

import { Box, Button, HStack, Heading, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, ImageModal, Modal } from "@spt/components";
import ApprovalModalContent from "@spt/components/approvalModalContent";
import LoadingState from "@spt/components/loadingState";
import RejectModalContent from "@spt/components/rejectModalContent";
import { useApproveKYCMutation } from "@spt/hooks/api/useApproveKYCMutation";
import { usePendingVerificationQuery } from "@spt/hooks/api/usePendingVerificationQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { useApprovalStore } from "@spt/store";
import { formatDate, formatTime } from "@spt/utils/dateTime";

const VerificationDetails: React.FC = () => {
  const openApproval = useApprovalStore((state) => state.openApproval);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);

  const { id } = useParams();
  const { data, isLoading } = usePendingVerificationQuery(Number(id));
  const { isApprovalLoading, approveKYCHandler } = useApproveKYCMutation(
    Number(id)
  );

  const handleOpenApproval = () => setOpenApproval(true);

  const firstDetails = [
    {
      title: "Full Name",
      value: `${data?.user?.first_name} ${data?.user?.last_name}`,
    },
    { title: "Email Address", value: data?.user?.email },
    { title: "Country", value: "Nigeria" },
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
            <HStack alignItems="center" justifyContent="space-between">
              <Heading size={{ base: "sm", md: "lg" }}>
                Verification Details
              </Heading>

              <Button variant="yellowOutline" px="10">
                View Full Profile
              </Button>
            </HStack>
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

          <HStack mt="6" gap="5" justifyContent="flex-end">
            <Modal buttonText="Reject Verification" variant="dangerOutline">
              <RejectModalContent
                buttonText="Yes, Reject Verification"
                heading="Reject This Verification"
                description="This action cannot be undone"
                label="Rejection"
                placeholder="rejecting this verification"
                onClose={() => {}}
              />
            </Modal>

            <Modal
              buttonText="Approve Verification"
              variant="yellow"
              open={openApproval}
              onOpenChange={handleOpenApproval}
              isLoading={isApprovalLoading}
            >
              <ApprovalModalContent
                heading="Approve This Verification"
                buttonText="Yes, Approve"
                onClick={approveKYCHandler}
                isLoading={isApprovalLoading}
              />
            </Modal>
          </HStack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default VerificationDetails;
