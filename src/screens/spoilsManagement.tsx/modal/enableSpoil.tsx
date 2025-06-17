import { type FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

export interface ComponentProps {
  onClick: () => void;
}

const EnableSpoilModalContent: FC<ComponentProps> = ({ onClick }) => {
  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        <Stack gap="8" my="4">
          <HStack justifyContent="center">
            <Image src="/question-chat.svg" alt="danger" />
          </HStack>

          <Stack textAlign="center">
            <Text fontSize="lg" fontWeight="medium">
              Are you sure you want to re-enable this spoil?
            </Text>

            <Text color="gray">
              This spoil will be visible to learners once you re-enable it
            </Text>
          </Stack>
        </Stack>
      </Dialog.Body>

      <Dialog.Footer>
        <HStack w="full" gap="5" justifyContent="center">
          <Dialog.ActionTrigger asChild>
            <Button variant="yellowOutline" w="50%">
              Cancel
            </Button>
          </Dialog.ActionTrigger>

          <Button variant="yellow" w="50%" onClick={onClick}>
            Yes, Re-enable
          </Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default EnableSpoilModalContent;