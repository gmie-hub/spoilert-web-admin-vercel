import { type FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { useApprovalStore, useSuccessStore } from "@spt/store";

import Modal from "./modal";
import SuccessModalContent from "./successModalContent";

interface ComponentProps {
  heading: string;
  onClick?: () => void;
  buttonText: string;
  isLoading: boolean;
}

const ApprovalModalContent: FC<ComponentProps> = ({
  buttonText,
  heading,
  onClick,
  isLoading,
}) => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenApproval = useApprovalStore((state) => state.setOpenApproval);

  const handleOpenSuccess = () => setOpenSuccess(true);

  const handleSuccessDone = () => {
    setOpenApproval(false);
    setOpenSuccess(false);
  };

  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        <Stack gap="8" my="4">
          <HStack justifyContent="center">
            <Image src="/question-chat.svg" alt="danger" />
          </HStack>

          <Stack textAlign="center">
            <Text fontSize="lg" fontWeight="medium">
              Are You Sure You Want To {heading}?
            </Text>

            <Text color="gray">This action cannot be undone</Text>
          </Stack>
        </Stack>
      </Dialog.Body>

      <Dialog.Footer>
        <HStack w="full" gap="5" justifyContent="center">
          <Dialog.ActionTrigger asChild>
            <Button variant="yellowOutline" flex="1">
              Cancel
            </Button>
          </Dialog.ActionTrigger>

          <Modal
            variant="yellow"
            isLoading={isLoading}
            buttonText={buttonText}
            onClick={onClick}
            flex="1"
            open={openSuccess}
            onOpenChange={handleOpenSuccess}
          >
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading="Verification Approved Successfully"
                  onClick={handleSuccessDone}
                />
              </Dialog.Body>
            </Dialog.Content>
          </Modal>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default ApprovalModalContent;
