import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

const DeleteAccountModalContent = () => {
  return (
    <Dialog.Content>
      <Dialog.Header>
        <HStack w="100%" justifyContent="center">
          <Image src="/delete-icon.svg" alt="delete" />
        </HStack>
      </Dialog.Header>

      <Dialog.Body>
        <Stack textAlign="center">
          <Text fontSize="lg" fontWeight="medium">
            Are You Sure You Want To Delete This User’s Account?
          </Text>

          <Text fontSize="sm" color="gray">
            This action cannot be undone
          </Text>
        </Stack>
      </Dialog.Body>

      <Dialog.Footer>
        <HStack w="100%" justifyContent="center">
          <Dialog.ActionTrigger asChild>
            <Button w="50%" variant="yellowOutline">Cancel</Button>
          </Dialog.ActionTrigger>

          <Button variant="danger" w="50%">Yes, Delete</Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default DeleteAccountModalContent;
