import { useState } from "react";

import { Box, Button, Flex, HStack, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Card, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import NoData from "@spt/components/noData";
import { useGetAllCmsQuery } from "@spt/hooks/api/useGetAllCmsQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { routes } from "@spt/routes";
import { cmsHeader } from "@spt/utils/tableData";

import TableBody from "./table/tableBody";

const Cms = () => {
  const navigate = useNavigate();
  const { page, pageSize, handlePageChange } = usePagination();
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, errorMessage } = useGetAllCmsQuery(
    page,
    search
  );

  const items = data?.data ?? [];
  const handleAddPage = () => navigate(routes.main.cms.addPage);

  // No pages exist at all (not just an empty search result).
  const showEmptyState = !isLoading && !isError && items.length === 0 && !search;

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
              CMS Pages
            </Text>

            {!showEmptyState && (
              <Button
                variant="yellow"
                w={{ base: "100%", md: "fit-content" }}
                onClick={handleAddPage}
              >
                <Icon as={HiOutlinePlus} /> Add New Page
              </Button>
            )}
          </Flex>

          {!showEmptyState && (
            <Input
              placeholder="Search for a page..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handlePageChange(1);
              }}
              bg="#FBFBFB"
              border="1px solid #EFEFEF"
              borderRadius="xl"
              h="48px"
              w="100%"
            />
          )}

          {isLoading ? (
            <LoadingState />
          ) : isError ? (
            <ErrorState error={errorMessage} />
          ) : showEmptyState ? (
            <NoData
              heading="You Haven't Created Any Page Yet!"
              description="All the CMS pages you create will be visible here"
            >
              <HStack justify="center">
                <Button variant="yellow" px="8" onClick={handleAddPage}>
                  <Icon as={HiOutlinePlus} /> Add New Page
                </Button>
              </HStack>
            </NoData>
          ) : items.length === 0 ? (
            <NoData
              heading="No pages found"
              description="No CMS page matches your search."
            />
          ) : (
            <>
              <Table
                headerChildren={<TableHeader headerItems={cmsHeader} />}
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

export default Cms;
