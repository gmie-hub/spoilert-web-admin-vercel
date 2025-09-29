import {
  Button,
  Dialog,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Card, Modal } from "@spt/components";
import ProgressInfo from "@spt/partials/progressInfo";
import WithdrawalDisplay from "@spt/partials/withdrawalDisplay";

const WithdrawalModalContent = () => {
  return (
    <Dialog.Content borderRadius="xl">
      <Dialog.Header>
        <Dialog.Title>Withdrawal Details</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Card px="3">
          <Stack>
            <Stack gap="6">
              <Stack>
                <Text fontSize="sm" color="gray">
                  Transaction ID:{" "}
                  <Text as="span" fontSize="md" fontWeight="medium">
                    ID-12345677900
                  </Text>
                </Text>

                <Button
                  w="20%"
                  bg="#E3F5FA"
                  color="#013B4D"
                  fontSize="xs"
                  borderRadius="xl"
                  fontWeight="semibold"
                  py="0"
                >
                  <Image src="/copy.svg" alt="copy" /> Copy
                </Button>
              </Stack>

              <Stack>
                <ProgressInfo>
                  <Stack alignItems="flex-start" flex="1">
                    <Text fontSize="xs" color="gray.100">
                      Name of Tutor
                    </Text>

                    <HStack gap="8">
                      <Text
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="medium"
                      >
                        Ogunsola Omorinsola
                      </Text>

                      <Button variant="yellowOutline" py="0">
                        View Profile
                      </Button>
                    </HStack>
                  </Stack>
                </ProgressInfo>

                <ProgressInfo>
                  <WithdrawalDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Amount Requested"
                    value={"₦500,000"}
                  />

                  <WithdrawalDisplay
                    flex={{ base: "0 0 50%", md: "0 0 50%" }}
                    title="Account Number and Bank Name"
                    value={"0123456789- Zenith Bank"}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <WithdrawalDisplay
                    flex={{ base: "0 0 50%", md: "0 0 50%" }}
                    title="Account Name"
                    value={"Ogunsola Omorinsola"}
                  />

                  <WithdrawalDisplay
                    flex={{ base: "0 0 50%", md: "0 0 50%" }}
                    title="Date and Time of Request"
                    value={"12-10-2025 | 09:43 am"}
                  />
                </ProgressInfo>
              </Stack>

              <HStack justifyContent="space-between">
                <Modal buttonText="Reject Withdrawal" variant="yellowOutline" px="8">

                </Modal>
                <Modal buttonText="Approve Withdrawal" variant="yellow" px="8">

                </Modal>
              </HStack>
            </Stack>
          </Stack>
        </Card>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default WithdrawalModalContent;
