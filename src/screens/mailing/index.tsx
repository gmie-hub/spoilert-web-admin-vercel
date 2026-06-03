import { useMemo, useState } from "react";

import { Box, Button, Flex, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { HiArrowPath } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import NoData from "@spt/components/noData";
import { useGetMailsQuery } from "@spt/hooks/api/useGetMailsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { mailingHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const Mailing = () => {
  const navigate = useNavigate();
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const { data, isLoading } = useGetMailsQuery(page, search);

  // Fall back to dummy data when the endpoint returns nothing.
  const baseList = data?.data?.length ? data.data : [];

  const items = useMemo(() => {
    let list = baseList;
    if (search) {
      const term = search.toLowerCase();
      list = list.filter(
        (item) =>
          item?.title?.toLowerCase().includes(term) ||
          item?.subject?.toLowerCase().includes(term)
      );
    }
    if (dateFilter) {
      list = list.filter((item) => item?.created_at?.startsWith(dateFilter));
    }
    return list;
  }, [baseList, search, dateFilter]);

  const isFiltering = !!(search || dateFilter);

  const handleResetFilter = () => {
    setSearch("");
    setDateFilter("");
    handlePageChange(1);
  };

  const handleSendEmail = () => navigate(routes.main.mailing.send);

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
              Mailing
            </Text>

            <Button
              variant="yellow"
              w={{ base: "100%", md: "fit-content" }}
              onClick={handleSendEmail}
            >
              <Icon as={HiOutlinePlus} /> Send an Email
            </Button>
          </Flex>

          {/* Toolbar */}
          <Flex
            gap="3"
            direction={{ base: "column", md: "row" }}
            align={{ md: "center" }}
            wrap="wrap"
          >
            <Input
              placeholder="Search for an email..."
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

          {isLoading ? (
            <LoadingState />
          ) : items.length === 0 ? (
            <NoData
              heading="No emails found"
              description="No emails match your current filters."
            />
          ) : (
            <>
              <Table
                headerChildren={<TableHeader headerItems={mailingHeader} />}
                bodyChildren={
                  <TableBody
                    items={items}
                    currentPage={page}
                    pageSize={pageSize}
                  />
                }
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={data?.total ?? items.length}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Mailing;
