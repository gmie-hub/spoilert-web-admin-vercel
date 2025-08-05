import React from "react";

import { Box, Button, HStack, Heading, Image, Stack } from "@chakra-ui/react";

import { Breadcrumb, Card, ImageModal, Modal } from "@spt/components";
import ApprovalModalContent from "@spt/components/approvalModalContent";
import RejectModalContent from "@spt/components/rejectModalContent";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";

const VerificationDetails: React.FC = () => {
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
                <InfoDisplay title="ID Type" value="NIN" />
                <InfoDisplay
                  title="Date and Time"
                  value="21-02-2025 | 09:43am"
                />
                <Box flex={{ base: "0 0 50%", md: "0 0 25%" }}>
                  <ImageModal />
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

            <Modal buttonText="Approve Verification" variant="yellow">
              <ApprovalModalContent
                heading="Approve This Verification"
                buttonText="Yes, Approve"
              />
            </Modal>
          </HStack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default VerificationDetails;

const firstDetails = [
  { title: "Full Name", value: "Ogunsola Omorinsola" },
  { title: "Email Address", value: "ogunsolaomorinsola@gmail.com" },
  { title: "Country", value: "Nigeria" },
];
