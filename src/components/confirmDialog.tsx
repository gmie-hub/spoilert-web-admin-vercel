import type { FC } from "react";

import {
  Button,
  type ButtonProps,
  Dialog,
  HStack,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

interface ComponentProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  image?: string;
  confirmVariant?: ButtonProps["variant"];
  loading?: boolean;
}

const ConfirmDialog: FC<ComponentProps> = ({
  open,
  title,
  description,
  confirmLabel,
  onOpenChange,
  onConfirm,
  image = "/question-chat.svg",
  confirmVariant = "yellow",
  loading = false,
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
          <Dialog.Content borderRadius="2xl" p={{ base: "6", md: "8" }}>
            <Dialog.Body p="0">
              <Stack gap="7">
                <Stack align="center" textAlign="center" gap="3">
                  <Image src={image} boxSize="80px" alt="confirm" />

                  <Text fontSize="lg" fontWeight="semibold">
                    {title}
                  </Text>
                  <Text fontSize="sm" color="gray">
                    {description}
                  </Text>
                </Stack>

                <HStack w="100%" gap="4">
                  <Button
                    variant="yellowOutline"
                    flex="1"
                    disabled={loading}
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={confirmVariant}
                    flex="1"
                    loading={loading}
                    onClick={onConfirm}
                  >
                    {confirmLabel}
                  </Button>
                </HStack>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
