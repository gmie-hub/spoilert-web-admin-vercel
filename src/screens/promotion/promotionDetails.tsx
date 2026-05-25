import {
  Box,
  Button,
  Dialog,
  Flex,
  HStack,
  Heading,
  Image,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import LoadingState from "@spt/components/loadingState";
import { useDeletePromotionPackageMutation } from "@spt/hooks/api/useDeletePromotionPackageMutation";
import { useGetPromotionPackagesQuery } from "@spt/hooks/api/useGetPromotionPackagesQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import { useDeleteStore, useEditStore } from "@spt/store";

const formatAmount = (amount: string | number) => {
  const value = Number(amount);
  if (Number.isNaN(value)) return String(amount);
  return `₦${value.toLocaleString()}`;
};

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const dateStr = date.toLocaleDateString();
  const timeStr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} | ${timeStr}`;
};

const PromotionDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const packageId = Number(id);

  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setEditingId = useEditStore((state) => state.setEditingId);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);

  const { data, isLoading, isError, errorMessage } =
    useGetPromotionPackagesQuery(1);

  const { deletePromotionPackageHandler, isDeleteLoading } =
    useDeletePromotionPackageMutation();

  const promotionPackage = data?.data?.find((p) => p.id === packageId);

  const handleEditPromotion = () => {
    if (!promotionPackage) return;
    setIsEdit(true);
    setEditingId(promotionPackage.id);
    navigate(routes.main.promotions.setupPromotion, {
      state: { promotionPackage },
    });
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleDeletePromotion = () => {
    deletePromotionPackageHandler(packageId);
  };

  if (isLoading) return <LoadingState />;
  if (isError)
    return (
      <Box color="red.500">
        {errorMessage || "Failed to load promotion package."}
      </Box>
    );
  if (!promotionPackage)
    return <Box>Promotion package not found.</Box>;

  const promotionDetails = [
    { title: "Promotion Name", value: promotionPackage.name },
    {
      title: "Duration",
      value: `${promotionPackage.duration} ${
        Number(promotionPackage.duration) === 1 ? "day" : "days"
      }`,
    },
    { title: "Amount", value: formatAmount(promotionPackage.amount) },
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

          <InfoDisplay
            title="Date Created"
            value={formatDate(promotionPackage.created_at)}
          />
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
              text="Promotion Package"
              handleClick={handleDeletePromotion}
              isLoading={isDeleteLoading}
              successMessage="Promotion package deleted successfully!"
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default PromotionDetails;
