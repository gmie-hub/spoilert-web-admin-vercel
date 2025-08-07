import { Box, Separator, Stack, Text } from "@chakra-ui/react";

import { Card, Pagination, Table } from "@spt/components";
import { useAllPendingVerification } from "@spt/hooks/api/useAllPendingVerificationQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";

import TableBody from "./table/tableBody";

const PendingVerification = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
    ...verificationData,
    key: index,
  }));

  const { data } = useAllPendingVerification();

  const visibleItems = data?.data?.slice(startRange, endRange);

  return (
    <Box>
      <Card>
        <Stack mb="4">
          <Stack gap="4">
            <Text fontSize="lg" fontWeight="semibold">
              Pending Verifications
            </Text>

            <Table
              headerChildren={<TableHeader headerItems={tableHeader} />}
              bodyChildren={<TableBody data={visibleItems} />}
            />
          </Stack>

          <Separator />

          <Box px={{ md: "5" }} mt="3">
            <Pagination
              page={page}
              pageSize={pageSize}
              items={duplicatedItems}
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

const verificationData = {
  id: 1,
  tutorName: "Jane Coker",
  email: "janecoker@gmail.com",
  country: "Nigeria",
  idType: "NIN",
  dateCreated: "12-10-2025 | 09:43 am",
};
