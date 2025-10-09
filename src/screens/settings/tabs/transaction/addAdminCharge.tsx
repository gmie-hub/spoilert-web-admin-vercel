import { Box, Button, Checkbox, Dialog, Flex, HStack, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { BackButton, Input, Modal, SubHeader } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useSuccessStore } from "@spt/store";
import { useAddAdminChargeStore } from "@spt/store/transaction";

const AddAdminCharge = () => {
  const setIsAdminCharge = useAddAdminChargeStore(
    (state) => state.setIsAddAdminCharge
  );
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const handleSuccessDone = () => {
    setOpenSuccess(false);
  };

  const handleBack = () => setIsAdminCharge(false);

  return (
    <Stack gap="6">
      <Box>
        <BackButton handleNavigation={handleBack} />
      </Box>

      <SubHeader>Add Admin Charge</SubHeader>

      <Formik initialValues={{}} onSubmit={() => {}}>
        {() => (
          <Flex direction="row" columnGap="6" rowGap="6" flexWrap="wrap">
            <Box w={{ base: "full", sm: "calc(50% - 12px)" }}>
              <Input
                name="minSpoilPrice"
                label="Minimum Spoil Price"
                placeholder="Enter amount"
              />
            </Box>

            <Stack w={{ base: "full", sm: "calc(50% - 12px)" }}>
              <Input
                name="maxSpoilPrice"
                label="Maximum Spoil Price"
                placeholder="Enter amount"
              />

              <Checkbox.Root>
                <Checkbox.HiddenInput />
                <Checkbox.Control h="20px" w="20px" borderRadius="md" />
                <Checkbox.Label fontWeight="normal" color="#495057">
                  No maximum limit (Check the box for all amount above the
                  minimum)
                </Checkbox.Label>
              </Checkbox.Root>
            </Stack>

            <Box w="full">
              <Input
                name="adminCharge"
                label="Admin Charge"
                placeholder="Enter amount"
              />
            </Box>

            <HStack w="full" justifyContent="flex-end">
              <Flex
                direction={{ base: "column", md: "row" }}
                w="full"
                gap="5"
                justifyContent="flex-end"
                mt="3"
              >
                <Button variant="yellowOutline" w={{ base: "100%", md: "20%" }}>
                  Cancel
                </Button>

                <Modal
                    buttonText="Save Admin Charge"
                    // isLoading={isEdit ? isEditLoading : isLoading}
                    variant="yellow"
                    type="submit"
                    open={openSuccess}
                    onOpenChange={(e) => setOpenSuccess(e.open)}
                    px="8"
                  >
                    <Dialog.Content>
                      <Dialog.Body>
                        <SuccessModalContent
                          heading="Admin Charge Set Successfully"
                          onClick={handleSuccessDone}
                        />
                      </Dialog.Body>
                    </Dialog.Content>
                  </Modal>
              </Flex>
            </HStack>
          </Flex>
        )}
      </Formik>
    </Stack>
  );
};

export default AddAdminCharge;
