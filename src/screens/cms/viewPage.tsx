import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card, RichText } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useDeleteCmsMutation } from "@spt/hooks/api/useDeleteCmsMutation";
import { useGetCmsDetailsQuery } from "@spt/hooks/api/useGetCmsDetailsQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import { useDeleteStore, useEditStore } from "@spt/store";
import { formatDate } from "@spt/utils/dateTime";

const ViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);

  const { data, isLoading, isError, cmsDetailsErrorMessage } =
    useGetCmsDetailsQuery(Number(id));
  const { deleteCmsHandler, isDeleteLoading, goToCms } = useDeleteCmsMutation();

  if (isLoading) return <LoadingState />;
  if (isError || !data)
    return (
      <ErrorState error={cmsDetailsErrorMessage || "Failed to load page details."} />
    );

  const handleEditPage = () => {
    setIsEdit(true);
    navigate(generatePath(routes.main.cms.editPage, { id: String(id) }));
  };

  const handleDeletePage = () => {
    if (id) deleteCmsHandler(Number(id));
  };

  return (
    <Stack gap="6">
      <Breadcrumb
        previousLink="CMS Pages"
        currentLink="View Page Details"
        previousHref={routes.main.cms.home}
        showBackButton
      />

      <Card>
        <Stack gap="6">
          <Flex
            align={{ md: "center" }}
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            rowGap="3"
          >
            <Heading size={{ base: "sm", md: "lg" }}>Page Details</Heading>

            <HStack gap="3">
              <Button variant="yellow" onClick={handleEditPage} flex="1">
                <Image src="/edit.svg" alt="edit" />
                Edit Page
              </Button>

              <Button
                variant="dangerOutline"
                onClick={() => setIsDeleteOpen(true)}
                flex="1"
              >
                <Image src="/trash.svg" alt="delete" />
                Delete Page
              </Button>
            </HStack>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
            <InfoDisplay title="Title" value={data?.title} />
            <InfoDisplay title="Slug" value={data?.slug || "N/A"} />
            <InfoDisplay
              title="Date Created"
              value={formatDate(data?.created_at)}
            />
          </Grid>

          <Separator />

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
              Description
            </Text>

            <RichText html={data?.description} fontSize={{ base: "md", md: "lg" }} />
          </Box>
        </Stack>
      </Card>

      <Dialog.Root
        open={isDeleteOpen}
        onOpenChange={(details) => setIsDeleteOpen(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <DeleteModalContent
              text="Page"
              handleClick={handleDeletePage}
              isLoading={isDeleteLoading}
              successMessage="Page deleted successfully!"
              onSuccessDone={goToCms}
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default ViewPage;
