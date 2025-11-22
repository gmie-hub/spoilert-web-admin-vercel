import type { FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

import { useDeleteStore, useSuccessStore } from "@spt/store";

import Modal from "./modal";
import SuccessModalContent from "./successModalContent";

interface ComponentProps {
  text: string;
  handleClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  successMessage?: string;
}

const DeleteModalContent: FC<ComponentProps> = ({
  handleClick,
  text,
  isLoading,
  successMessage = "Post deleted successfully!",
}) => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenDelete = useDeleteStore((state) => state.setOpenDelete);

  const handleSuccessDone = () => {
    setOpenDelete(false);
    setOpenSuccess(false);
  };

  return (
    <Dialog.Content borderRadius="xl">
      <Dialog.Header>
        <HStack w="100%" justifyContent="center">
          <Image src="/delete-icon.svg" alt="delete" />
        </HStack>
      </Dialog.Header>

      <Dialog.Body>
        <Stack textAlign="center">
          <Text fontSize="lg" fontWeight="medium">
            Are You Sure You Want To Delete This {text}?
          </Text>

          <Text fontSize="sm" color="gray">
            This action cannot be undone
          </Text>
        </Stack>
      </Dialog.Body>

      <Dialog.Footer mt="4" mb="4">
        <HStack w="100%" justifyContent="center" gap="5">
          <Dialog.ActionTrigger asChild>
            <Button type="button" w="50%" variant="yellowOutline">
              Cancel
            </Button>
          </Dialog.ActionTrigger>

          <Modal
            variant="danger"
            isLoading={isLoading}
            buttonText="Yes, Delete"
            onClick={handleClick}
            flex="1"
            open={openSuccess}
          >
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading={successMessage}
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

export default DeleteModalContent;
