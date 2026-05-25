import { useState } from "react";

import {
  Flex,
  Heading,
  Input,
  Portal,
  Select,
  Stack,
  Tabs,
  createListCollection,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { transactionsList } from "@spt/utils/transactions";

// import AirtimeAndData from "./tabs/airtimeAndData";
import SpoilPurchase from "./tabs/spoilPurchase";
import Sponsorship from "./tabs/sponsorship";

const statusCollection = createListCollection({
  items: [
    { label: "All Status", value: "all" },
    { label: "Successful", value: "successful" },
    { label: "Failure", value: "failed" },
    { label: "Pending", value: "pending" },
  ],
});

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // "all" means no status filter, so it isn't sent to the endpoint.
  const statusFilter = status === "all" ? "" : status;

  return (
    <Card>
      <Stack mb="2" gap={{ base: "6", md: "4" }}>
        <Heading size={{ base: "sm", md: "lg" }}>Transactions</Heading>

        <Flex
          gap="3"
          direction={{ base: "column", md: "row" }}
          align={{ md: "center" }}
          justify="space-between"
        >
          <Input
            placeholder="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            borderRadius="xl"
            h="48px"
            maxW={{ md: "420px" }}
            w="100%"
          />

          <Input
            type="date"
            aria-label="From date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            max={toDate || undefined}
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            borderRadius="xl"
            h="48px"
            w={{ base: "100%", md: "180px" }}
          />

          <Input
            type="date"
            aria-label="To date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            min={fromDate || undefined}
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            borderRadius="xl"
            h="48px"
            w={{ base: "100%", md: "180px" }}
          />

          <Select.Root
            collection={statusCollection}
            value={[status]}
            onValueChange={(e) => setStatus(e.value[0] ?? "all")}
            w={{ base: "100%", md: "220px" }}
          >
            <Select.HiddenSelect />

            <Select.Control h="48px">
              <Select.Trigger borderRadius="xl" bg="#FBFBFB">
                <Select.ValueText placeholder="Filter by status" />
              </Select.Trigger>

              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {statusCollection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </Flex>

        <CustomTabs tabList={transactionsList}>
          <>
            <Tabs.Content value="spoilPurchase">
              <SpoilPurchase
                status={statusFilter}
                search={search}
                fromDate={fromDate}
                toDate={toDate}
              />
            </Tabs.Content>

            {/* <Tabs.Content value="airtimeData">
              <AirtimeAndData />
            </Tabs.Content> */}

            <Tabs.Content value="sponsorship">
              <Sponsorship
                status={statusFilter}
                search={search}
                fromDate={fromDate}
                toDate={toDate}
              />
            </Tabs.Content>
          </>
        </CustomTabs>
      </Stack>
    </Card>
  );
};

export default Transactions;
