import { useState } from "react";

import { Box, HStack, Input, Separator, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useAllPendingVerification } from "@spt/hooks/api/useAllPendingVerificationQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";

import TableBody from "./table/tableBody";

const PendingVerification = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useAllPendingVerification();

  const filtered = data?.data?.filter((item) => {
    if (!search) return true;
    const s = search.toLowerCase();
    const fullName = `${item.user.first_name} ${item.user.last_name}`.toLowerCase();
    return (
      fullName.includes(s) ||
      item.user.email.toLowerCase().includes(s) ||
      (item.user.country_code || "").toLowerCase().includes(s) ||
      (item.type || "").toLowerCase().includes(s)
    );
  });

  const visibleItems = filtered?.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack mb="4">
          <Stack gap="4">
            <Text fontSize="lg" fontWeight="semibold">
              Pending Verifications
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
              <Table
                headerChildren={<TableHeader headerItems={tableHeader} />}
                bodyChildren={<TableBody data={visibleItems} />}
              />
            )}
          </Stack>

          <Separator />

          <Box px={{ md: "5" }} mt="3">
            <Pagination
              page={page}
              pageSize={pageSize}
              items={filtered || []}
              onPageChange={handlePageChange}
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default PendingVerification;

const tableHeader = [
  "Name of Tutor",
  "Email Address",
  "Country",
  "ID Type",
  "Date and Time",
  "Action",
];