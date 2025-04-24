import React, { type FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";

export interface ComponentProps {
  onClose: () => void;
  setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const UnblockWithdrawalModalContent: FC<ComponentProps> = ({
  onClose,
  setIsBlocked,
}) => {
  const handleUnblock = () => {
    setIsBlocked(false);
    onClose();
  };

  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        <Stack gap="8" my="4">
          <HStack justifyContent="center">
            <Image src="/question-chat.svg" alt="danger" />
          </HStack>

          <Stack textAlign="center">
            <Text fontSize="lg" fontWeight="medium">
              Are You Sure You Want To Unblock Withdrawals For This Tutor?
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

          <Button variant="yellow" w="50%" onClick={handleUnblock}>
            Unblock Withdrawal
          </Button>
        </HStack>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default UnblockWithdrawalModalContent;
