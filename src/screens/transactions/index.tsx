import { Heading, Stack, Tabs } from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { transactionsList } from "@spt/utils/transactions";

import AirtimeAndData from "./tabs/airtimeAndData";
import SpoilPurchase from "./tabs/spoilPurchase";
import Sponsorship from "./tabs/sponsorship";
import Withdrawal from "./tabs/withdrawal";

const Transactions = () => {
  return (
    <Card>
      <Stack mb="2" gap={{ base: "6", md: "4" }}>
        <Heading size={{ base: "sm", md: "lg" }}>Transactions</Heading>

        <CustomTabs tabList={transactionsList}>
          <>
            <Tabs.Content value="spoilPurchase">
              <SpoilPurchase />
            </Tabs.Content>

            <Tabs.Content value="withdrawal">
              <Withdrawal />
            </Tabs.Content>

            <Tabs.Content value="airtimeData">
              <AirtimeAndData />
            </Tabs.Content>

            <Tabs.Content value="sponsorship">
              <Sponsorship />
            </Tabs.Content>
          </>
        </CustomTabs>
      </Stack>
    </Card>
  );
};

export default Transactions;