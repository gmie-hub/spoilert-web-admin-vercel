import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useModalStore, useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

type MetaData = {
  contact_email_id?: string;
  contact_location?: number;
  contact_phone_number?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  max: number;
  min: number;
  charge: number;
};

interface Payload {
  id: number;
  metadata: MetaData[];
  value: string;
}

export const useUpdateSettingsMutation = (id: number) => {
  const setOpenModal = useModalStore((state) => state.setOpenModal);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const queryClient = useQueryClient();

  const updateSettings = async (payload: Payload) => {
    return (await apiCall().patch(`admin/settings/${id}`, payload))?.data;
  };

  const updateSettingsMutation = useMutation({
    mutationKey: ["update-settings"],
    mutationFn: updateSettings,
  });

  const updateSettingsHandler = async (values: FormikValues) => {
    // If caller passes a pre-built metadata array (for admin charges add/edit), use it directly.
    // Otherwise, build metadata from individual fields (for other settings forms).
    const metadataFromValues =
      (values?.metadata as MetaData[] | undefined) ||
      (values?.metadataArray as MetaData[] | undefined);

    const payload: Payload = {
      id,
      metadata:
        metadataFromValues &&
        Array.isArray(metadataFromValues) &&
        metadataFromValues.length > 0
          ? metadataFromValues
          : [
              {
                contact_email_id: values.contactEmailID,
                contact_location: values.contactLocation,
                contact_phone_number: values.contactPhoneNumber,
                twitter: values.twitter,
                facebook: values.facebook,
                linkedin: values.linkedin,
                instagram: values.instagram,
                max: values.maxSpoilPrice,
                min: values.minSpoilPrice,
                charge: values.adminCharge,
              },
            ],
      value: values.certificateFee ?? "",
    };

    try {
      await updateSettingsMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Settings updated!",
          });

          queryClient.invalidateQueries({
            queryKey: ["get-settings"],
          });

          setOpenModal(false);
          setOpenSuccess(true);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description: error?.message || "Something went wrong",
      });
    }
  };

  return {
    updateSettingsHandler,
    isUpdateLoading: updateSettingsMutation?.isPending,
  };
};
