import type { FC } from "react";

import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";

interface ComponentProps {
  open: boolean;
  /** What is being deleted, e.g. "Question" reads "...Delete This Question?" */
  itemName: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteDialog: FC<ComponentProps> = ({
  open,
  itemName,
  description = "You won't be able to recover it once it is deleted",
  confirmLabel = "Yes Delete",
  loading = false,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => onOpenChange(details.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="440px" mx="4" p="6">
            <Dialog.Body p="0">
              <Stack gap="5">
                <Flex justify="flex-end">
                  <IconButton
                    aria-label="Close"
                    variant="ghost"
                    size="sm"
                    color="gray.500"
                    disabled={loading}
                    onClick={() => onOpenChange(false)}
                  >
                    <HiX size={18} />
                  </IconButton>
                </Flex>

                <Stack align="center" textAlign="center" gap="3">
                  <Image src="/delete-icon.svg" alt="" boxSize="80px" />

                  <Text fontSize="lg" fontWeight="semibold">
                    Are You Sure You Want To Delete This {itemName}?
                  </Text>

                  <Text fontSize="sm" color="gray">
                    {description}
                  </Text>
                </Stack>

                <Stack gap="3">
                  <Button
                    variant="danger"
                    w="full"
                    loading={loading}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>

                  <Button
                    variant="yellowOutline"
                    w="full"
                    disabled={loading}
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default DeleteDialog;
