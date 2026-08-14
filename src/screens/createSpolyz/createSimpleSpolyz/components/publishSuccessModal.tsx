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

interface PublishSuccessModalProps {
  open: boolean;
  tutorName: string;
  isCreatingCommunity: boolean;
  onCreateCommunity: () => void;
  onSkip: () => void;
}

const PublishSuccessModal: FC<PublishSuccessModalProps> = ({
  open,
  tutorName,
  isCreatingCommunity,
  onCreateCommunity,
  onSkip,
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={() => undefined}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="520px" mx="4">
            <Stack gap="6" p="6" textAlign="center">
              <HStack justify="center">
                <Image src="/success.gif" boxSize="120px" alt="success" />
              </HStack>

              <Stack gap="3">
                <Text fontSize="md" fontWeight="semibold" color="dark">
                  Spoylz Successfully Created For {tutorName} and it has been
                  submitted for review. Once approved, it will go live on the
                  platform! 🥳
                </Text>

                <Text fontSize="md" fontWeight="semibold" color="dark" pt="2">
                  Do you want to create a community for this Spoylz?
                </Text>

                <Text fontSize="sm" color="gray.500">
                  You can create a community for your learners to ask questions
                  and share ideas. If you skip this step, you can create a
                  community later.
                </Text>
              </Stack>

              <Stack gap="3" w="full">
                <Button
                  variant="yellow"
                  w="full"
                  loading={isCreatingCommunity}
                  onClick={onCreateCommunity}
                >
                  Create A Community
                </Button>

                <Button
                  variant="yellowOutline"
                  w="full"
                  onClick={onSkip}
                  disabled={isCreatingCommunity}
                >
                  Skip For Now
                </Button>
              </Stack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PublishSuccessModal;
