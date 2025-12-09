import { Dialog, Heading, Portal, Stack } from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useEditStore, useSuccessStore } from "@spt/store";

import PromotionForm from "./form/promotionForm";

const SetupPromotion = () => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const isEdit = useEditStore((state) => state.isEdit);
  // const setIsEdit = useEditStore((state) => state.setIsEdit);

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Promotions"
        currentLink={isEdit ? "Edit Promotion Package" : "Set Up Promotion Package"}
      />

      <Card>
        <Stack gap="6">
          <Heading>{isEdit ? "Edit" : "Set Up"} Promotion Package</Heading>

          <PromotionForm />
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
                  heading="Promotion Package Created Successfully"
                  onClick={() => setOpenSuccess(false)}
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
