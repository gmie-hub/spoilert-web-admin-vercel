import { Dialog, Heading, Portal, Stack } from "@chakra-ui/react";

import { Breadcrumb, Card } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useEditStore, useSuccessStore } from "@spt/store";

import AdsForm from "./form/adsForm";

const CreateAds = () => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const isEdit = useEditStore((state) => state.isEdit);
  // const setIsEdit = useEditStore((state) => state.setIsEdit);

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Ads"
        currentLink={isEdit ? "Edit Ads" : "Create Ads"}
        showBackButton
      />

      <Card>
        <Stack gap="6">
          <Heading>{isEdit ? "Edit" : "Create"} Ads</Heading>

          <AdsForm />
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
                  heading="Ads Created Successfully"
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

export default CreateAds;
