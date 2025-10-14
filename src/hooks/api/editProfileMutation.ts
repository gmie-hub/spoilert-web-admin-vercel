// useEditProfileMutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  middie_name: string;
  last_name: string;
  first_name: string;
  avatar?: File;
  _method: string;
}

export const useEditProfileMutation = (
  avatar: File,
  id?: number,
  onSuccessCallback?: () => void // ✅ allow external success callback
) => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const queryClient = useQueryClient();

  const updateProfile = async (payload: Payload) => {
    return (
      await apiCall().post(`/users/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    )?.data;
  };

  const editProfileMutation = useMutation({
    mutationKey: ["profile", id],
    mutationFn: updateProfile,
  });

  const editProfileHandler = async (values: FormikValues) => {
    const payload: Payload = {
      last_name: values.lastName,
      first_name: values.firstName,
      middie_name: values.middleName,
      avatar: avatar,
      _method: "patch",
    };

    try {
      await editProfileMutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Profile updated!",
          });

          queryClient.invalidateQueries({
            queryKey: ["Profile-details"],
          });

          setOpenSuccess(true);
          onSuccessCallback?.(); // ✅ trigger external callback
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
    isEditLoading: editProfileMutation.isPending,
    editProfileHandler,
  };
};
