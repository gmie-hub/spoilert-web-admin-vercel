import { useEffect } from "react";

import { Box, Dialog, Heading, Portal, Stack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import SuccessModalContent from "@spt/components/successModalContent";
import { useGetPromotionPackagesQuery } from "@spt/hooks/api/useGetPromotionPackagesQuery";
import { routes } from "@spt/routes";
import { useEditStore, useSuccessStore } from "@spt/store";
import type { PromotionPackage } from "@spt/types/promotion";

import PromotionForm from "./form/promotionForm";

const SetupPromotion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const packageFromState = (
    location.state as { promotionPackage?: PromotionPackage } | null
  )?.promotionPackage;

  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const isEdit = useEditStore((state) => state.isEdit);
  const editingId = useEditStore((state) => state.editingId);
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setEditingId = useEditStore((state) => state.setEditingId);

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate(routes.main.promotions.home);
  };

  // reset edit mode when leaving this screen
  useEffect(() => {
    return () => {
      setIsEdit(false);
      setEditingId(null);
    };
  }, [setIsEdit, setEditingId]);

  // Only fetch the list as a fallback when we don't already have the package from navigation state
  const shouldFetchList = isEdit && !packageFromState;
  const { data, isLoading, isError, errorMessage } =
    useGetPromotionPackagesQuery(1);

  const editingPackage =
    packageFromState ??
    (isEdit && editingId != null
      ? data?.data?.find((p) => p.id === editingId)
      : undefined);

  const initialValues = editingPackage
    ? {
        name: editingPackage.name,
        duration: String(editingPackage.duration),
        amount: String(editingPackage.amount),
      }
    : undefined;

  if (shouldFetchList && isLoading) return <LoadingState />;
  if (shouldFetchList && isError)
    return (
      <Box color="red.500">
        {errorMessage || "Failed to load promotion package."}
      </Box>
    );

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Promotions"
        currentLink={isEdit ? "Edit Promotion Package" : "Set Up Promotion Package"}
      />

      <Card>
        <Stack gap="6">
          <Heading>{isEdit ? "Edit" : "Set Up"} Promotion Package</Heading>

          <PromotionForm
            initialValues={initialValues}
            packageId={editingPackage?.id}
          />
        </Stack>
      </Card>

      <Dialog.Root
        open={openSuccess}
        onOpenChange={(details) => setOpenSuccess(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading={
                    isEdit
                      ? "Promotion Package Updated Successfully"
                      : "Promotion Package Created Successfully"
                  }
                  onClick={handleSuccessDone}
                />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default SetupPromotion;
