import { Box, Button, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Card, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import NoData from "@spt/components/noData";
import { useGetAllUsersQuery } from "@spt/hooks/api/useGetAllUsersQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { subAdminsHeader } from "@spt/utils/tableData";

import { SUB_ADMIN_ROLE } from "./data";
import TableBody from "./table/tableBody";

const SubAdmins = () => {
  const navigate = useNavigate();
  const { page, pageSize, handlePageChange } = usePagination();

  const { data, isLoading, isError, errorMessage } = useGetAllUsersQuery(
    SUB_ADMIN_ROLE,
    page
  );

  const items = data?.data ?? [];
  const handleCreate = () => navigate(routes.main.subAdmins.create);

  const showEmptyState = !isLoading && !isError && items.length === 0;

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
              Sub-Admins
            </Text>

            {!showEmptyState && (
              <Button
                variant="yellow"
                w={{ base: "100%", md: "fit-content" }}
                onClick={handleCreate}
              >
                <Icon as={HiOutlinePlus} /> Create Sub-Admin
              </Button>
            )}
          </Flex>

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={errorMessage} />
          ) : showEmptyState ? (
            <NoData
              heading="No Sub-Admins Yet!"
              description="Sub-admins you create will be listed here."
            >
              <HStack justify="center">
                <Button variant="yellow" px="8" onClick={handleCreate}>
                  <Icon as={HiOutlinePlus} /> Create Sub-Admin
                </Button>
              </HStack>
            </NoData>
          ) : (
            <>
              <Table
                headerChildren={<TableHeader headerItems={subAdminsHeader} />}
                bodyChildren={
                  <TableBody items={items} startIndex={(page - 1) * pageSize} />
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

export default SubAdmins;
