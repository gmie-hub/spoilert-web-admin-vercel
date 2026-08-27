import { type FC } from "react";

import {
  Button,
  Dialog,
  HStack,
  Image,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";

interface CommunitySuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const CommunitySuccessModal: FC<CommunitySuccessModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => !d.open && onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="480px" mx="4">
            <Stack gap="6" p="6" textAlign="center">
              <HStack justify="center">
                <Image src="/success.gif" boxSize="120px" alt="success" />
              </HStack>

              <Stack gap="2">
                <Text fontSize="md" fontWeight="semibold" color="dark">
                  Your Community Has Been Created Successfully 🎉
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Learners can now join and start engaging with you and others
                </Text>
              </Stack>

              <Button variant="yellow" w="full" onClick={onClose}>
                Okay
              </Button>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CommunitySuccessModal;
