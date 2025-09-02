import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { Card, Modal, NoData, Pagination, Table } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetAllCategoriesQuery } from "@spt/hooks/api/useGetAllCategoriesQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { useModalStore } from "@spt/store";
import { categoriesHeader } from "@spt/utils/tableData";

import CategoryModalContent from "./modal/categoryModalContent";
import TableBody from "./table/tableBody";

const Categories = () => {
  const { page, pageSize, startRange, endRange, handlePageChange } =
    usePagination();

  const { data, isLoading } = useGetAllCategoriesQuery();

  const openModal = useModalStore((state) => state.openModal);
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const visibleItems = data?.data?.slice(startRange, endRange);

  const hasNoData = data?.data?.length === 0;

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              Categories
            </Text>

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
                items={data?.data}
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
                  open={openModal}
                  onOpenChange={(e) => setOpenModal(e.open)}
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