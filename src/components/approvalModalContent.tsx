import { type FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  heading: string;
  onClick?: () => void;
  buttonText: string;
}

const ApprovalModalContent: FC<ComponentProps> = ({
  buttonText,
  heading,
  onClick,
}) => {
  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        <Stack gap="8" my="4">
          <HStack justifyContent="center">
            <Image src="/question-chat.svg" alt="danger" />
          </HStack>

          <Stack textAlign="center">
            <Text fontSize="lg" fontWeight="medium">
              Are You Sure You Want To {heading}?
            </Text>

            <Text color="gray">This action cannot be undone</Text>
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
            {buttonText}
          </Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default ApprovalModalContent;
