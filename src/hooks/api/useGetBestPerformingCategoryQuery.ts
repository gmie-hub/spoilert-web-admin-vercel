import { useQuery } from "@tanstack/react-query";

import type { BestPerformingCategoryResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetBestPerformingCategoryQuery = (page: number) => {
  const fetchBestPerformingCategory =
    async (): Promise<BestPerformingCategoryResponse> => {
      return (
        await apiCall().get(
          `/analytics/spoil/group/best-performing/category?page=${page}`
        )
      )?.data;
    };

  const { data, isLoading, isError, error } = useQuery<
    BestPerformingCategoryResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["best-performing-category", page],
    queryFn: fetchBestPerformingCategory,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch best performing spoils per category";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
