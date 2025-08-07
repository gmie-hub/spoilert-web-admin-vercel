import type { FC } from "react";
import type React from "react";

import { Button, HStack, Image, Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  onClose: () => void;
  setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockWithdrawalSuccessModalContent: FC<ComponentProps> = ({
  onClose,
  setIsBlocked,
}) => {
  const handleDone = () => {
    setIsBlocked(true);
    onClose();
  };

  return (
    <Stack gap="8">
      <HStack justifyContent="center">
        <Image src="/success_icon.gif" w="150px" h="150px" alt="danger" />
      </HStack>

      <Stack textAlign="center">
        <Text fontSize="lg" fontWeight="medium">
          Withdrawal Has Been Successfully Blocked For This Tutor.
        </Text>

        <Text color="gray">
          They will no longer be able to withdraw funds until unblocked
        </Text>
      </Stack>

      <Button variant="yellow" onClick={handleDone}>
        Done
      </Button>
    </Stack>
  );
};

export default BlockWithdrawalSuccessModalContent;
