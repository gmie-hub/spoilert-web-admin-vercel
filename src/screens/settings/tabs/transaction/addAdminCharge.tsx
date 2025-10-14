import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
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
    editingData,
    editingIndex,
    resetEditingState,
    settingsId,
    adminChargesData,
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

          // Build the full metadata array to send (append on add, update only the selected index on edit)
          const nextMetadata = (adminChargesData || []).map((c) => ({
            max: c.max,
            min: c.min,
            charge: c.charge,
          }));

          const fullMetadata = isEditMode
            ? nextMetadata.map((c, idx) =>
                idx === (editingIndex as number) ? newCharge : c
              )
            : [...nextMetadata, newCharge];

          // Send the complete array so the backend preserves unchanged items
          await updateSettingsHandler({ metadata: fullMetadata });
        }}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {() => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </Stack>
  );
};

export default AddAdminCharge;