import { useState } from "react";

import { Box, HStack, Input, Stack, Text } from "@chakra-ui/react";

import { Card, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllSpoilQuery } from "@spt/hooks/api/useGetAllSpoilQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsMgtHeaders } from "@spt/utils/tableData";

import TableBody from "../spoilsManagement.tsx/table/tableBody";

const DisabledSpolyz = () => {
  const { page, pageSize, handlePageChange, setPage } = usePagination();
  const [search, setSearch] = useState<string>("");

  // is_active=0 is what marks a Spoylz as disabled.
  const { data, isLoading, isError, errorMessage } = useGetAllSpoilQuery(
    page,
    search,
    0,
  );

  const spoils = data?.data ?? [];

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Disabled Spolyz
          </Text>

          <HStack justify="flex-start">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              maxW="420px"
              w="100%"
            />
          </HStack>

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={errorMessage} />
          ) : spoils.length === 0 ? (
            <NoData
              heading="No Disabled Spolyz"
              description="Spolyz you disable will show up here."
            />
          ) : (
            <>
              <Table
                headerChildren={<TableHeader headerItems={spoilsMgtHeaders} />}
                bodyChildren={
                  <TableBody
                    data={spoils}
                    currentPage={page}
                    pageSize={pageSize}
                  />
                }
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

export default DisabledSpolyz;
