import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { HiArrowPath } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { Card, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import NoData from "@spt/components/noData";
import { useGetNotificationsQuery } from "@spt/hooks/api/useGetNotificationsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { notificationsHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const typeCollection = createListCollection({
  items: [
    { label: "All Types", value: "all" },
    { label: "Push notification", value: "Push notification" },
    { label: "In-App Notification", value: "In-App Notification" },
  ],
});

const Notifications = () => {
  const navigate = useNavigate();
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  // "all" means no type filter is applied.
  const typeFilter = type === "all" ? "" : type;

  const { data, isLoading, isError, errorMessage } = useGetNotificationsQuery(
    page,
    search
  );

  const items = useMemo(() => {
    let list = data?.data ?? [];
    if (typeFilter) {
      list = list.filter((item) => item?.type === typeFilter);
    }
    if (dateFilter) {
      list = list.filter((item) => item?.created_at?.startsWith(dateFilter));
    }
    return list;
  }, [data?.data, typeFilter, dateFilter]);

  const isFiltering = !!(search || typeFilter || dateFilter);

  // No notifications exist at all (not just an empty filter result).
  const showEmptyState =
    !isLoading && !isError && (data?.data?.length ?? 0) === 0 && !isFiltering;

  const handleResetFilter = () => {
    setSearch("");
    setType("all");
    setDateFilter("");
    handlePageChange(1);
  };

  return (
    <Box>
      <Card>
        <Stack gap="5">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ md: "center" }}
            rowGap="3"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Notifications
            </Text>

            {!showEmptyState && (
              <Button
                variant="yellow"
                w={{ base: "100%", md: "fit-content" }}
                onClick={() => navigate(routes.main.notifications.send)}
              >
                <Icon as={HiOutlinePlus} /> Send Notification
              </Button>
            )}
          </Flex>

          {/* Toolbar */}
          {!showEmptyState && (
          <Flex
            gap="3"
            direction={{ base: "column", md: "row" }}
            align={{ md: "center" }}
            wrap="wrap"
          >
            <Input
              placeholder="Search for a notification..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handlePageChange(1);
              }}
              bg="#FBFBFB"
              border="1px solid #EFEFEF"
              borderRadius="xl"
              h="48px"
              flex={{ md: "1" }}
              w="100%"
            />

            <Select.Root
              collection={typeCollection}
              value={[type]}
              onValueChange={(e) => {
                setType(e.value[0] ?? "all");
                handlePageChange(1);
              }}
              w={{ base: "100%", md: "220px" }}
            >
              <Select.HiddenSelect />

              <Select.Control h="48px">
                <Select.Trigger borderRadius="xl" bg="#FBFBFB">
                  <Select.ValueText placeholder="Filter by" />
                </Select.Trigger>

                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>

              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {typeCollection.items.map((item) => (
                      <Select.Item item={item} key={item.value}>
                        {item.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Input
              type="date"
              aria-label="Date sent"
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                handlePageChange(1);
              }}
              bg="#FBFBFB"
              border="1px solid #EFEFEF"
              borderRadius="xl"
              h="48px"
              w={{ base: "100%", md: "180px" }}
            />

            {isFiltering && (
              <Button
                variant="ghost"
                color="blue.100"
                onClick={handleResetFilter}
                px="2"
                h="48px"
              >
                <Icon as={HiArrowPath} /> Reset Filter
              </Button>
            )}
          </Flex>
          )}

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={errorMessage} />
          ) : showEmptyState ? (
            <NoData
              heading="You Haven't Sent Any Notification Yet!"
              description="Send a notification to users and all the notifications you send shows up here"
            >
              <HStack justify="center">
                <Button
                  variant="yellow"
                  px="8"
                  onClick={() => navigate(routes.main.notifications.send)}
                >
                  <Icon as={HiOutlinePlus} /> Send Notification
                </Button>
              </HStack>
            </NoData>
          ) : items.length === 0 ? (
            <NoData
              heading="No notifications found"
              description="No notifications match your current filters."
            />
          ) : (
            <>
              <Table
                headerChildren={
                  <TableHeader headerItems={notificationsHeader} />
                }
                bodyChildren={<TableBody items={items} />}
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={data?.total}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Notifications;
