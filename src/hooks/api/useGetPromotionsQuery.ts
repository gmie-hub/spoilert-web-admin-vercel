import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { PromotionsResponse } from "@spt/types/promotion";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetPromotionsQuery = (page: number) => {
  const fetchPromotions = async (): Promise<PromotionsResponse> => {
    return (await apiCall().get(`/promotions?per_page=20&page=${page}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    PromotionsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["promotions", page],
    queryFn: fetchPromotions,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch promotions";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
