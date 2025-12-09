import {
  Button,
  Dialog,
  Flex,
  HStack,
  Heading,
  Image,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import { useDeleteStore, useEditStore, useSuccessStore } from "@spt/store";

const PromotionDetails = () => {
  const navigate = useNavigate();
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  // const { data, isLoading } = useSpoilDetailsQuery(Number(id));

  // if (isLoading) return <LoadingState />;

  const handleEditPromotion = () => {
    setIsEdit(true);
    navigate(routes.main.promotions.setupPromotion);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleDeletePromotion = () => {
    setOpenSuccess(true);
  };

  const promotionDetails = [
    { title: "Promotion Name", value: "Basic" },
    { title: "Duration", value: "7 days" },
    {
      title: "Amount",
      value: "N20,000",
    },
  ];

  return (
    <Stack>
      <Breadcrumb
        previousLink="Promotions Management"
        currentLink="View Promotion Managetion Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "6" }}>
          <Flex align="center" justify="space-between" w="100%">
            <Heading size={{ base: "sm", md: "lg" }}>
              Promotion Management Details
            </Heading>

            <HStack gap={3}>
              <Button variant="yellow" onClick={handleEditPromotion} flex="1">
                <Image src="/edit.svg" alt="add" />
                Edit Promotion Package
              </Button>

              <Button variant="dangerOutline" onClick={handleDeleteClick} flex="1">
                <Image src="/trash.svg" alt="add" />
                Delete Promotion Package
              </Button>
            </HStack>
          </Flex>

          <ProgressInfo>
            {promotionDetails.map((item, index) => (
              <InfoDisplay title={item.title} value={item.value} key={index} />
            ))}
          </ProgressInfo>

          <InfoDisplay title="Date Created" value="12-10-2025 | 09:43 am" />
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
              text="Post"
              handleClick={handleDeletePromotion}
              // isLoading={isDeleteLoading}
              successMessage="Promotion package deleted successfully!"
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default PromotionDetails;
