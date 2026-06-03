import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Portal,
  Select,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { HiArrowPath } from "react-icons/hi2";

import { Card, NoData, Pagination, Table } from "@spt/components";
import { InputGroup } from "@spt/components/ui/input-group";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { reportReasons, reportedTutorsHeader } from "@spt/utils/tableData";

import { reportedTutors } from "../data";

import TableBody from "./table/tableBody";

const reasonCollection = createListCollection({
  items: [
    { label: "All Reasons", value: "all" },
    ...reportReasons.map((reason) => ({ label: reason, value: reason })),
  ],
});

const ReportedTutors = () => {
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState("");
  const [reason, setReason] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const reasonFilter = reason === "all" ? "" : reason;

  const filtered = useMemo(() => {
    return reportedTutors.filter((item) => {
      const matchesSearch =
        !search ||
        item.tutor.name.toLowerCase().includes(search.toLowerCase());
      const matchesReason = !reasonFilter || item.reason === reasonFilter;
      const matchesDate = !dateFilter || item.dateReported === dateFilter;
      return matchesSearch && matchesReason && matchesDate;
    });
  }, [search, reasonFilter, dateFilter]);

  const isFiltering = !!(search || reasonFilter || dateFilter);
  const showEmptyState = reportedTutors.length === 0 && !isFiltering;

  const paginated = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page, pageSize]
  );

  const handleResetFilter = () => {
    setSearch("");
    setReason("all");
    setDateFilter("");
    handlePageChange({ page: 1 });
  };

  return (
    <Box>
      <Card>
        <Stack gap="5">
          <Text fontSize="lg" fontWeight="semibold">
            Reported Tutors
          </Text>

          {/* Toolbar */}
          {!showEmptyState && (
            <Flex
              gap="3"
              direction={{ base: "column", md: "row" }}
              align={{ md: "center" }}
              wrap="wrap"
            >
              <InputGroup
                flex={{ md: "1" }}
                w="100%"
                startElement={
                  <Image src="/search-normal.svg" alt="search" boxSize="18px" />
                }
              >
                <Input
                  placeholder="Search for a tutor..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    handlePageChange({ page: 1 });
                  }}
                  bg="#FBFBFB"
                  border="1px solid #EFEFEF"
                  borderRadius="xl"
                  h="48px"
                />
              </InputGroup>

              <Select.Root
                collection={reasonCollection}
                value={[reason]}
                onValueChange={(e) => {
                  setReason(e.value[0] ?? "all");
                  handlePageChange({ page: 1 });
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
                      {reasonCollection.items.map((item) => (
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
                aria-label="Date reported"
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  handlePageChange({ page: 1 });
                }}
                bg="#FBFBFB"
                border="1px solid #EFEFEF"
                borderRadius="xl"
                h="48px"
                w={{ base: "100%", md: "190px" }}
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

          {showEmptyState ? (
            <NoData
              heading="No Tutors Have Been Reported Yet!"
              description="When a learner reports a tutor, the report will appear here for review."
            />
          ) : paginated.length === 0 ? (
            <NoData
              heading="No reports found"
              description="No reported tutors match your current filters."
            />
          ) : (
            <>
              <Table
                headerChildren={
                  <TableHeader headerItems={reportedTutorsHeader} />
                }
                bodyChildren={
                  <TableBody
                    items={paginated}
                    currentPage={page}
                    pageSize={pageSize}
                  />
                }
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={filtered.length}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default ReportedTutors;
