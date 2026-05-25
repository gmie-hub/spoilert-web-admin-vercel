import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { PromotionPackagesResponse } from "@spt/types/promotion";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetPromotionPackagesQuery = (page: number) => {
  const fetchPromotionPackages = async (): Promise<PromotionPackagesResponse> => {
    return (
      await apiCall().get(`/promotion-packages?per_page=20&page=${page}`)
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    PromotionPackagesResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["promotion-packages", page],
    queryFn: fetchPromotionPackages,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch promotion packages";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
