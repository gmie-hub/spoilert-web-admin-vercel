import type { FC } from "react";

import { Button, Dialog, Image, Stack, Text } from "@chakra-ui/react";

import { Card, Tag } from "@spt/components";

import Airtime from "./airtime";
import DataPurchase from "./dataPurchase";
import SpoilPurchase from "./spoilPurchase";
import Sponsorship from "./sponsorship";
import Withdraw from "./withdraw";

interface ComponentProps {
  item: Record<string, string>;
}

const TransactionDetails: FC<ComponentProps> = ({ item }) => {
  const displayContent = (type: string) => {
    switch (type) {
      case "Spoil Purchase":
        return <SpoilPurchase item={item} />;
      case "Sponsorship":
        return <Sponsorship item={item} />;
      case "Withdrawal":
        return <Withdraw item={item} />;
      case "Airtime":
        return <Airtime item={item} />;
      case "Data":
        return <DataPurchase item={item} />;
      default:
        return <SpoilPurchase item={item} />;
    }
  };

  return (
    <Dialog.Content borderRadius="xl">
      <Dialog.Header>
        <Dialog.Title>Transaction Details</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Card px="3">
          <Stack>
            <Stack gap="4">
              <Stack>
                <Text fontSize="sm" color="gray">
                  Transaction ID:{" "}
                  <Text as="span" fontSize="md" fontWeight="medium">
                    {item.transactionID}
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

              {displayContent(item?.transactionType)}

              <Stack>
                <Text color="gray">Status</Text>
                <Tag status={item.status} />
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default TransactionDetails;