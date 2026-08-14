import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface CreateModulePayload {
  title: string;
  description?: string;
  spoil_id: number | string;
}

/** Modules are created one-by-one against a spoil that already exists. */
export const useCreateModuleMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateModulePayload) => {
      const res = await apiCall().post("modules", payload);
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message || "Failed to add module. Try again.",
      });
    },
  });

  return {
    createModule: mutation.mutateAsync,
    isCreatingModule: mutation.isPending,
  };
};

/** The id of a newly created module, whichever shape the API wraps it in. */
export const getCreatedModuleId = (response: any) =>
  response?.data?.id ??
  response?.data?.module_id ??
  response?.data?.data?.id ??
  null;
