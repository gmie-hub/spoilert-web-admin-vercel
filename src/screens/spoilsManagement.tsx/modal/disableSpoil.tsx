import type { FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

interface DisableSpoilModalContentProps {
  onClick: () => void;
}

const DisableSpoilModalContent: FC<DisableSpoilModalContentProps> = ({
  onClick,
}) => {
  return (
    <Dialog.Content borderRadius="xl">
      <Dialog.Header>
        <HStack w="100%" justifyContent="center">
          <Image src="/danger-triangle.svg" alt="delete" />
        </HStack>
      </Dialog.Header>

      <Dialog.Body>
        <Stack textAlign="center">
          <Text fontSize="lg" fontWeight="medium">
            Are You Sure You Want To disable this spoil?
          </Text>

          <Text fontSize="sm" color="gray">
            Once the spoil is disabled, It will no longer be visible to learners
            until re-enabled
          </Text>
        </Stack>
      </Dialog.Body>

      <Dialog.Footer mt="4" mb="4">
        <HStack w="100%" justifyContent="center">
          <Dialog.ActionTrigger asChild>
            <Button w="50%" variant="yellowOutline">
              Cancel
            </Button>
          </Dialog.ActionTrigger>

          <Button variant="danger" w="50%" onClick={onClick}>
            Yes, Disable
          </Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default DisableSpoilModalContent;
