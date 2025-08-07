import type { FC } from "react";
import type React from "react";

import { Box } from "@chakra-ui/react";

import SuccessModalContent from "@spt/components/successModalContent";

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
    <Box>
      <SuccessModalContent
        heading="Withdrawal Has Been Successfully Blocked For This Tutor."
        description="They will no longer be able to withdraw funds until unblocked"
        onClick={handleDone}
      />
    </Box>
  );
};

export default BlockWithdrawalSuccessModalContent;
