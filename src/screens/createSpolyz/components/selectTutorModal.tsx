import { type FC, useState } from "react";

import {
  Button,
  Dialog,
  Flex,
  HStack,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiX } from "react-icons/hi";

import type { UserDatum } from "@spt/types/user";

import TutorSelect from "./tutorSelect";

interface SelectTutorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTutor: UserDatum | null;
  onContinue: (tutor: UserDatum) => void;
  /** When false, the modal cannot be dismissed until a tutor is chosen. */
  dismissible?: boolean;
}

const SelectTutorModal: FC<SelectTutorModalProps> = ({
  open,
  onOpenChange,
  selectedTutor,
  onContinue,
  dismissible = true,
}) => {
  const [tutor, setTutor] = useState<UserDatum | null>(selectedTutor);
  const [showError, setShowError] = useState(false);

  const handleContinue = () => {
    if (!tutor) {
      setShowError(true);
      return;
    }

    onContinue(tutor);
    onOpenChange(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && !dismissible) {
      return;
    }

    if (nextOpen) {
      setTutor(selectedTutor);
      setShowError(false);
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => handleOpenChange(d.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
      closeOnInteractOutside={dismissible}
      closeOnEscape={dismissible}
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="520px" mx="4">
            <Stack gap="6" p="6">
              <Flex align="center" justify="space-between" gap="3">
                <Text fontSize="lg" fontWeight="semibold" color="dark">
                  Create Spoil
                </Text>

                {dismissible && (
                  <IconButton
                    aria-label="Close"
                    variant="outline"
                    size="sm"
                    borderRadius="full"
                    borderColor="#E0E0E0"
                    color="gray.500"
                    onClick={() => handleOpenChange(false)}
                  >
                    <HiX size={16} />
                  </IconButton>
                )}
              </Flex>

              <Text fontSize="sm" color="gray.500">
                To create a spoil, select the tutor this Spoil is being created
                for
              </Text>

              <TutorSelect
                value={tutor}
                onChange={(next) => {
                  setTutor(next);
                  setShowError(false);
                }}
                showError={showError}
              />

              <HStack gap="4" pt="2">
                {dismissible && (
                  <Button
                    variant="yellowOutline"
                    flex="1"
                    onClick={() => handleOpenChange(false)}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  variant="yellow"
                  flex="1"
                  w={dismissible ? undefined : "full"}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </HStack>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SelectTutorModal;
