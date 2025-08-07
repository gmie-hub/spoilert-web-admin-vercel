import React, { type FC, useState } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";

import { Textarea } from "@spt/components";

import BlockWithdrawalSuccessModalContent from "./blockWithdrawalSuccess";

export interface ComponentProps {
  onClose: () => void;
  setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockWithdrawalModalContent: FC<ComponentProps> = ({
  onClose,
  setIsBlocked,
}) => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        {!openSuccess && (
          <Stack gap="8" my="4">
            <HStack justifyContent="center">
              <Image src="/danger-triangle.svg" alt="danger" />
            </HStack>

            <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="medium">
                Are You Sure You Want To Block Withdrawals For This Tutor?
              </Text>

              <Text color="gray">
                This action cannot be undone and let the tutor know why you’re
                blocking his withdrawals
              </Text>
            </Stack>

            <Formik initialValues={{}} onSubmit={() => {}}>
              {() => {
                return (
                  <Stack w="100%" gap="8">
                    <Textarea
                      name="reason"
                      label="Reason For Blocking Withdrawals"
                      placeholder="Enter the reason why you’re blocking the tutor’s withdrawal"
                    />

                    <HStack w="full" gap="5" justifyContent="center">
                      <Dialog.ActionTrigger asChild>
                        <Button variant="yellowOutline" w="50%">
                          Cancel
                        </Button>
                      </Dialog.ActionTrigger>

                      <Button
                        variant="danger"
                        w="50%"
                        onClick={handleOpenSuccess}
                      >
                        Block Withdrawal
                      </Button>
                    </HStack>
                  </Stack>
                );
              }}
            </Formik>
          </Stack>
        )}

        {openSuccess && (
          <BlockWithdrawalSuccessModalContent setIsBlocked={setIsBlocked} onClose={onClose} />
        )}
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default BlockWithdrawalModalContent;
