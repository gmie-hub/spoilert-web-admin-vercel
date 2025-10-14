import { useMutation } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  current_password: string;
  password: string;
}

export const useChangePasswordMutation = () => {
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const changePassword = async (payload: Payload) => {
    return (
      await apiCall().patch("/users/changePassword", payload)
    )?.data;
  };

  const mutation = useMutation({
    mutationKey: ["change-password"],
    mutationFn: changePassword,
  });

  const changePasswordHandler = async (values: FormikValues) => {
    const payload: Payload = {
      current_password: values.currentPassword,
      password:values?.newPassword,
    };

    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Password updated!",
          });

         
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
    isLoading: mutation.isPending,
    changePasswordHandler,
  };
};
