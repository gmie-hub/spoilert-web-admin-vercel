import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { UpdateAdminUserPayload } from "@spt/types/admin";
import apiCall from "@spt/utils/apiCall";
import { getApiErrorMessage } from "@spt/utils/apiError";

export const useUpdateAdminUserMutation = (id?: number) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["update-admin-user", id],
    mutationFn: async ({ avatar, ...payload }: UpdateAdminUserPayload) => {
      // Skip blanks so an untouched field never overwrites a stored value with
      // an empty string — most importantly `password`, which the edit form
      // leaves empty unless the admin is deliberately resetting it.
      const body = Object.fromEntries(
        Object.entries(payload).filter(
          ([, value]) => value !== "" && value != null
        )
      );

      // A profile picture is the only reason to leave JSON behind. PHP does not
      // populate the request body from a multipart payload on a real PATCH, so
      // the upload has to POST and declare the verb via `_method` — Laravel
      // routes that back to the same PATCH endpoint.
      if (avatar) {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("avatar", avatar);
        formData.append("_method", "patch");

        const res = await apiCall().post(`/admin/users/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res?.data;
      }

      const res = await apiCall().patch(`/admin/users/${id}`, body);
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Sub-admin updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Failed to update sub-admin. Try again."
        ),
      });
    },
  });

  return {
    updateAdminUser: mutation.mutateAsync,
    isUpdateLoading: mutation.isPending,
  };
};
