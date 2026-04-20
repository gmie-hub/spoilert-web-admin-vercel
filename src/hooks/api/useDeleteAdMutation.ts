import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { useSuccessStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

export const useDeleteAdMutation = () => {
    

  const queryClient = useQueryClient();
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const navigate = useNavigate();

  const deleteAd = async (id: number) => {
    return (await apiCall().delete(`/ads/${id}`))?.data;
  };

  const deleteAdMutation = useMutation({
    mutationKey: ["delete-ad"],
    mutationFn: deleteAd,
  });

  const deleteAdHandler = async (id: number) => {
    try {
      await deleteAdMutation.mutateAsync(id, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Ad deleted successfully!",
          });
          queryClient.invalidateQueries({ queryKey: ["ads"] });
          setOpenSuccess(true);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  };

  // Call this after success modal is closed
  const goToAds = () => navigate("/ads");

  return {
    isDeleteLoading: deleteAdMutation.isPending,
    deleteAdHandler,
    goToAds,
  };
};
