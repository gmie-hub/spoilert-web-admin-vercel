import { useState } from "react";

import { Box, HStack, Input, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetAllSpoilQuery } from "@spt/hooks/api/useGetAllSpoilQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { spoilsMgtHeaders } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const SpoilsManagement = () => {
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useGetAllSpoilQuery(page, search);

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Text fontSize="lg" fontWeight="semibold">
            Spoil Management
          </Text>

          <HStack justify="flex-start">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handlePageChange(1);
              }}
              maxW="420px"
              w="100%"
            />
          </HStack>

          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <Table
                headerChildren={<TableHeader headerItems={spoilsMgtHeaders} />}
                bodyChildren={
                  <TableBody
                    data={data?.data}
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

export default SpoilsManagement;
