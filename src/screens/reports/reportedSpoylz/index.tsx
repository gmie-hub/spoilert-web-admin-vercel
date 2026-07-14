import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiArrowPath } from "react-icons/hi2";

import { Card, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { InputGroup } from "@spt/components/ui/input-group";
import { useGetReportsQuery } from "@spt/hooks/api/useGetReportsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import type { Paginated, RawSpoilReport } from "@spt/types/report";
import { reportedSpoylzHeader } from "@spt/utils/tableData";

import { mapSpoilReport } from "./mapReport";
import TableBody from "./table/tableBody";

const ReportedSpoylz = () => {
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, errorMessage } =
    useGetReportsQuery<Paginated<RawSpoilReport>>("spoil", page);

  // Live records for the current server page, normalised to the table shape.
  const reports = useMemo(
    () => (data?.data ?? []).map(mapSpoilReport),
    [data]
  );

  // Search filters the current page by spoil title or tutor name.
  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return reports.filter(
      (item) =>
        !query ||
        item.spoil.title.toLowerCase().includes(query) ||
        item.tutor.name.toLowerCase().includes(query)
    );
  }, [reports, search]);

  const isFiltering = !!search;
  const total = data?.total ?? 0;
  const showEmptyState = total === 0 && !isFiltering;

  const handleResetFilter = () => {
    setSearch("");
    handlePageChange({ page: 1 });
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Box>
      <Card>
        <Stack gap="5">
          <Text fontSize="lg" fontWeight="semibold">
            Reported Spoylz
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
                  placeholder="Search for a spoylz, tutor..."
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
              heading="No Spoylz Have Been Reported Yet!"
              description="When a learner reports a spoil, the report will appear here for review."
            />
          ) : filtered.length === 0 ? (
            <NoData
              heading="No reports found"
              description="No reported spoylz match your current filters."
            />
          ) : (
            <>
              <Table
                headerChildren={
                  <TableHeader headerItems={reportedSpoylzHeader} />
                }
                bodyChildren={
                  <TableBody
                    items={filtered}
                    currentPage={page}
                    pageSize={pageSize}
                  />
                }
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={total}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default ReportedSpoylz;
