import { type FC, useState } from "react";

import {
  Box,
  Center,
  Dialog,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Card, Modal } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import BlockWithdrawalModalContent from "@spt/screens/tutors/modal/blockWithdrawal";
import UnblockWithdrawalModalContent from "@spt/screens/tutors/modal/unblockWithdrawal";
import type { UserDatum } from "@spt/types/user";

interface ComponentProps {
  data: UserDatum;
}


const UserDetails: FC<ComponentProps> = ({ data }) => {
  const [openBlock, setOpenBlock] = useState(false);
  const [openUnblock, setOpenUnblock] = useState(false);
  const [isBlocked, setIsBlock] = useState(false);

  const handleBlockModal = (e: any) => setOpenBlock(e.open);
  const handleUnblockModal = (e: any) => setOpenUnblock(e.open);

  const handleCloseModal = () => setOpenBlock(false);
  const handleCloseUnblockModal = () => setOpenUnblock(false);

  const tutorOverviewInfo = [
    {
      image: "/moneys.svg",
      color: "#F0FFF4",
      header: "Total Earnings",
      amount: "N1,100,000",
    },
    {
      image: "/yellow-book.svg",
      color: "#D4A43714",
      header: "Total Spoils Created",
      amount: data?.total_spoils_created,
    },
    {
      image: "/people.svg",
      color: "#375AD414",
      header: "Followers",
      amount: data?.followers_count,
    },
  ];

  
  return (
    <Stack gap="6">
      <Card pb="4" pt="3">
        <Stack my="0" gap="4">
          <Text fontWeight="medium">Verified Document</Text>

          <HStack
            justifyContent="space-between"
            alignItems="center"
            bg="#F8F8F8"
            ps="4"
            py="2"
            borderRadius="lg"
          >
            <HStack>
              <Image src="/nin.png" alt="idCard" h="40px" w="63px" />

              <Box>
                <Text fontSize="xs" fontWeight="medium">
                  NIN.png
                </Text>

                <Text fontSize="10px" color="gray.400">
                  3.5MB
                </Text>
              </Box>
            </HStack>

            <Modal
              variant="ghost"
              buttonIcon={<Image src="/maximize.svg" alt="arrow" />}
              px="0"
              py="0"
            >
              <Dialog.Content>
                <Image src="/nin.png" alt="nin" />
              </Dialog.Content>
            </Modal>
          </HStack>
        </Stack>
      </Card>

      <Card>
        <Stack gap="4">
          <Box bg="#FFFAEE" borderRadius="xl" p="4" border="1px solid #F6EFDE">
            <Stack>
              <Text fontSize="xs" color="gray.500">
                Wallet Balance
              </Text>

              <Text fontWeight="semibold">{`N ${data?.wallet?.balance}`}</Text>
            </Stack>
          </Box>

          {tutorOverviewInfo.map((item, index) => (
            <Card key={index} px="4">
              <HStack alignItems="center" gap="4">
                <Center bg={item.color} borderRadius="full" p="3">
                  <Image src={item.image} alt="money" />
                </Center>

                <InfoDisplay title={item.header} value={item.amount} md="sm" />


              </HStack>
            </Card>
          ))}

          <Modal
            buttonText={isBlocked ? "Unblock Withdrawal" : "Block Withdrawal"}
            variant={isBlocked ? "yellow" : "danger"}
            open={isBlocked ? openUnblock : openBlock}
            onOpenChange={isBlocked ? handleUnblockModal : handleBlockModal}
            size="lg"
          >
            {isBlocked ? (
              <UnblockWithdrawalModalContent
                onClose={handleCloseUnblockModal}
                setIsBlocked={setIsBlock}
              />
            ) : (
              <BlockWithdrawalModalContent
                onClose={handleCloseModal}
                setIsBlocked={setIsBlock}
              />
            )}
          </Modal>
        </Stack>
      </Card>

      <Card>
        <Stack gap="4">
          <Text fontWeight="medium">Bank Account</Text>

          <Card pt="1.5" pb="1.5" px="4">
            <Stack>
              <HStack>
                <Image src="/firstbank.svg" alt="bank" />
                <Text fontSize="sm">First Bank Nigeria</Text>
              </HStack>

              <Text fontWeight="medium" fontSize="sm">
                0123456789-{" "}
                <Text as="span" fontWeight="normal" color="gray.500">
                  Ogunsola Omorinsola
                </Text>
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Card>
    </Stack>
  );
};

export default UserDetails;
