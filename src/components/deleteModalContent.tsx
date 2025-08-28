import type { FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  text: string;
  handleClick?: () => void;
}

const DeleteModalContent: FC<ComponentProps> = ({ handleClick, text }) => {
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
        <HStack w="100%" justifyContent="center">
          <Dialog.ActionTrigger asChild>
            <Button type="button" w="50%" variant="yellowOutline">
              Cancel
            </Button>
          </Dialog.ActionTrigger>

          <Button variant="danger" w="50%" onClick={handleClick}>
            Yes, Delete
          </Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default DeleteModalContent;