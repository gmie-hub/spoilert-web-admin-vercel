import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { Card, Modal, NoData, Pagination, Table } from "@spt/components";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { categoriesData, categoriesHeader } from "@spt/utils/tableData";

import CategoryModalContent from "./modal/categoryModalContent";
import TableBody from "./table/tableBody";

const duplicatedItems = Array.from({ length: 15 }, (_, index) => ({
  ...categoriesData,
  key: index,
}));

const Categories = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const visibleItems = duplicatedItems.slice(startRange, endRange);

  const hasNoData = false;
  
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              Categories
            </Text>

            {!hasNoData && (
              <Modal
                buttonIcon={<Image src="/add-circle.svg" alt="add" />}
                buttonText="Create Category"
                variant="yellow"
                size="md"
              >
                <CategoryModalContent
                  title="Create Category"
                  buttonText="Create Category"
                />
              </Modal>
            )}
          </Flex>

          {!hasNoData && (
            <>
              <Table
                headerChildren={<TableHeader headerItems={categoriesHeader} />}
                bodyChildren={<TableBody items={visibleItems} />}
              />

              <Pagination
                page={page}
                pageSize={pageSize}
                items={duplicatedItems}
                onPageChange={handlePageChange}
              />
            </>
          )}

          {hasNoData && (
            <NoData
              heading="You Haven’t Created A Category Yet!"
              description="Start by creating a category and all the categories you create will show up here"
            >
              <Box mt="5" w="full">
                <Modal
                  buttonIcon={<Image src="/add-circle.svg" alt="add" />}
                  buttonText="Create Category"
                  variant="yellow"
                  size="md"
                >
                  <CategoryModalContent
                    title="Create Category"
                    buttonText="Create Category"
                  />
                </Modal>
              </Box>
            </NoData>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default Categories;