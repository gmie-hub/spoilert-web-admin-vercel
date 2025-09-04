import { Box, HStack, Heading, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card, Modal } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useCategoryDetailsQuery } from "@spt/hooks/api/useCategoryDetailsQuery";
import { useDeleteCategoryMutation } from "@spt/hooks/api/useDeleteCategoryMutation";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { useEditStore, useModalStore } from "@spt/store";
import { formatDate } from "@spt/utils/dateTime";

import CategoryModalContent from "./modal/categoryModalContent";

const CategoryDetails = () => {
  const { id } = useParams();

  const { categoryDetailsData, isLoading, isError, errorMessage } =
    useCategoryDetailsQuery(Number(id));

    const { isDeleteLoading, deleteCategoryHandler } = useDeleteCategoryMutation()
  

  const openModal = useModalStore((state) => state.openModal);
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const setIsEdit = useEditStore((state) => state.setIsEdit);

  const handleEdit = () => setIsEdit(true);

  const firstDetails = [
    { title: "Category Name", value: categoryDetailsData?.name },
    {
      title: "No of Spoils",
      value: categoryDetailsData?.total_spoils?.toString(),
    },
    {
      title: "Date Created",
      value: formatDate(categoryDetailsData?.created_at),
    },
  ];

  if (isLoading) return <LoadingState />;

  if (isError) return <ErrorState error={errorMessage} />;

  return (
    <Stack>
      <Breadcrumb
        previousLink="Categories"
        currentLink="View Category Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Category Details</Heading>

            <HStack gap="3">
              <Modal
                buttonIcon={<Image src="/edit.svg" alt="edit" />}
                buttonText="Edit Category"
                variant="yellow"
                size="md"
                onClick={handleEdit}
                open={openModal}
                onOpenChange={(e) => setOpenModal(e.open)}
              >
                <CategoryModalContent
                  title="Edit Category"
                  buttonText="Save Changes"
                  data={categoryDetailsData}
                />
              </Modal>

              <Modal
                buttonIcon={<Image src="/trash.svg" alt="delete" />}
                buttonText="Delete Category"
                variant="dangerOutline"
              >
                <DeleteModalContent handleClick={() => deleteCategoryHandler(parseInt(id))} text={isDeleteLoading ? 'deleting...' : `${categoryDetailsData?.name} Category`}/>
              </Modal>
            </HStack>
          </HStack>

          <Stack mt="5">
            <Stack gap="6">
              <Box>
                <Image src="/user-icon.svg" alt="user" boxSize="14" />
              </Box>

              <ProgressInfo>
                {firstDetails.map((item, index) => (
                  <InfoDisplay
                    title={item.title}
                    value={item.value}
                    key={index}
                  />
                ))}
              </ProgressInfo>

              <ProgressInfo>
                <InfoDisplay
                  title="Description"
                  value={categoryDetailsData?.description}
                />
              </ProgressInfo>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default CategoryDetails;
