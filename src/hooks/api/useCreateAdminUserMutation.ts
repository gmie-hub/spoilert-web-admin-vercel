import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type {
  CreateAdminUserPayload,
  CreateAdminUserResponse,
} from "@spt/types/admin";
import apiCall from "@spt/utils/apiCall";
import { getApiErrorMessage } from "@spt/utils/apiError";

export const useCreateAdminUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-admin-user"],
    mutationFn: async ({ avatar, ...payload }: CreateAdminUserPayload) => {
      // Drop keys the form left blank so an untouched optional field never
      // reaches the API as an empty string and trips its validation.
      const body = Object.fromEntries(
        Object.entries(payload).filter(
          ([, value]) => value !== "" && value != null
        )
      );

      // Only a picked profile picture forces multipart; otherwise the request
      // stays plain JSON, matching the documented contract.
      if (avatar) {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          formData.append(key, value as string);
        });
        formData.append("avatar", avatar);

        const res = await apiCall().post<CreateAdminUserResponse>(
          "/admin/users",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        return res?.data;
      }

      const res = await apiCall().post<CreateAdminUserResponse>(
        "/admin/users",
        body
      );
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Sub-admin created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description: getApiErrorMessage(
          error,
          "Failed to create sub-admin. Try again."
        ),
      });
    },
  });

  return {
    createAdminUser: mutation.mutateAsync,
    isLoading: mutation.isPending,
  };
};
