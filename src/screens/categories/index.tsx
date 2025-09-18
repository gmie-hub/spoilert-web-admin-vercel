import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { Card, Modal, NoData, Pagination, Table } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllCategoriesQuery } from "@spt/hooks/api/useGetAllCategoriesQuery";
import { usePagination } from "@spt/hooks/usePagination";
import TableHeader from "@spt/partials/tableHeader";
import { useEditStore, useModalStore } from "@spt/store";
import { categoriesHeader } from "@spt/utils/tableData";

import CategoryModalContent from "./modal/categoryModalContent";
import TableBody from "./table/tableBody";

const Categories = () => {
  const { page, pageSize, handlePageChange } = usePagination();

  const { data, isLoading, isError, categoryErrorMessage } =
    useGetAllCategoriesQuery(page);

  const openModal = useModalStore((state) => state.openModal);
  const setOpenModal = useModalStore((state) => state.setOpenModal);
  const setIsEdit = useEditStore((state) => state.setIsEdit);

  const handleEdit = () => setIsEdit(false);

  const hasNoData = data?.total === 0;

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={categoryErrorMessage} />;

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
              onClick={handleEdit}
              open={openModal}
              onOpenChange={(e) => setOpenModal(e.open)}
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
                bodyChildren={
                  <TableBody
                    items={data?.data}
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
