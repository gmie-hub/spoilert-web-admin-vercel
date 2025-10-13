import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { object } from "yup";

import { BackButton, Input, Modal, SubHeader } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useUpdateSettingsMutation } from "@spt/hooks/api/useUpdateSettingsMutation";
import { useSuccessStore } from "@spt/store";
import {
  useAddAdminChargeStore,
  useAdminChargesStore,
} from "@spt/store/transaction";
import { validations } from "@spt/utils/validations";

const AddAdminCharge = () => {
  const setIsAdminCharge = useAddAdminChargeStore(
    (state) => state.setIsAddAdminCharge
  );
  const {
    addAdminCharge,
    updateAdminCharge,
    editingData,
    editingIndex,
    resetEditingState,
    settingsId,
  } = useAdminChargesStore();
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const isEditMode = editingIndex !== null;

  // Use the existing mutation hook
  const { isUpdateLoading, updateSettingsHandler } = useUpdateSettingsMutation(
    settingsId || 0
  );

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    setIsAdminCharge(false);
    resetEditingState();
  };

  const handleBack = () => {
    setIsAdminCharge(false);
    resetEditingState();
  };

  const initialValues = {
    minSpoilPrice: isEditMode ? editingData?.min?.toString() || "" : "",
    maxSpoilPrice: isEditMode ? editingData?.max?.toString() || "" : "",
    adminCharge: isEditMode ? editingData?.charge?.toString() || "" : "",
  };

  const validationSchema = object().shape({
    minSpoilPrice: validations.minSpoilPrice,
    maxSpoilPrice: validations.maxSpoilPrice,
    adminCharge: validations.adminCharge,
  });

  return (
    <Stack gap="6">
      <Box>
        <BackButton handleNavigation={handleBack} />
      </Box>

      <SubHeader>
        {isEditMode ? "Edit Admin Charge" : "Add Admin Charge"}
      </SubHeader>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          const newCharge = {
            min: Number(values.minSpoilPrice),
            max: values.maxSpoilPrice ? Number(values.maxSpoilPrice) : null,
            charge: Number(values.adminCharge),
          };

          // Update the local state first
          if (isEditMode) {
            updateAdminCharge(editingIndex!, newCharge);
          } else {
            addAdminCharge(newCharge);
          }

          // Format the data for the updateSettingsHandler
          const formikValues = {
            minSpoilPrice: values.minSpoilPrice,
            maxSpoilPrice: values.maxSpoilPrice,
            adminCharge: values.adminCharge,
            // Include other required fields (these might be empty for admin charges)
            // contactEmailID: "",
            // contactLocation: 0,
            // contactPhoneNumber: "",
            // twitter: "",
            // facebook: "",
            // linkedin: "",
            // instagram: "",
            // certificateFee: "",
          };

          // Call the existing updateSettingsHandler
          await updateSettingsHandler(formikValues);

          // setOpenSuccess(true);
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
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
                <Button
                  variant="yellowOutline"
                  w={{ base: "100%", md: "20%" }}
                  onClick={handleBack}
                >
                  Cancel
                </Button>

                <Modal
                  buttonText={
                    isEditMode ? "Update Admin Charge" : "Save Admin Charge"
                  }
                  isLoading={isUpdateLoading}
                  variant="yellow"
                  type="submit"
                  open={openSuccess}
                  onOpenChange={(e) => setOpenSuccess(e.open)}
                  px="8"
                >
                  <Dialog.Content>
                    <Dialog.Body>
                      <SuccessModalContent
                        heading={
                          isEditMode
                            ? "Admin Charge Updated Successfully"
                            : "Admin Charge Set Successfully"
                        }
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
