import type { FC } from "react";

import { Button, Dialog, Image, Portal, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  open: boolean;
  message: string;
  onOpenChange: (open: boolean) => void;
  buttonLabel?: string;
}

const SuccessDialog: FC<ComponentProps> = ({
  open,
  message,
  onOpenChange,
  buttonLabel = "Okay",
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
              <Stack gap="6" align="center" textAlign="center">
                <Image src="/success.gif" boxSize="120px" alt="success" />

                <Text fontSize="lg" fontWeight="medium">
                  {message}
                </Text>

                <Button
                  variant="yellow"
                  w="full"
                  onClick={() => onOpenChange(false)}
                >
                  {buttonLabel}
                </Button>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SuccessDialog;
