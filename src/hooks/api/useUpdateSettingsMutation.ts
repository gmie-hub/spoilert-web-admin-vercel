import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
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
};

interface Payload {
  id: number;
  metadata: MetaData[];
}

export const useUpdateSettingsMutation = (id: number) => {
  const queryClient = useQueryClient();

  const updateSettings = async (payload: Payload) => {
    return (await apiCall().patch(`admin/settings/${id}`, payload))?.data;
  };

  const updateSettingsMutation = useMutation({
    mutationKey: ["update-settings"],
    mutationFn: updateSettings,
  });

  const updateSettingsHandler = async (values: FormikValues) => {
    const payload: Payload = {
      id,
      metadata: [
        {
          contact_email_id: values.contactEmailID,
          contact_location: values.contactLocation,
          contact_phone_number: values.contactPhoneNumber,
          twitter: values.twitter,
          facebook: values.facebook,
          linkedin: values.linkedin,
          instagram: values.instagram,
        },
      ],
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
