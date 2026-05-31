import { useQuery } from "@tanstack/react-query";

import type { BestPerformingCategoryResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface BestPerformingCategoryParams {
  page: number;
  interval?: string;
  from?: string;
  to?: string;
  status?: string;
  search?: string;
}

export const useGetBestPerformingCategoryQuery = ({
  page,
  interval,
  from,
  to,
  status,
  search,
}: BestPerformingCategoryParams) => {
  const fetchBestPerformingCategory =
    async (): Promise<BestPerformingCategoryResponse> => {
      return (
        await apiCall().get(
          `/analytics/spoil/group/best-performing/category`,
          {
            params: {
              page,
              interval,
              from: from || undefined,
              to: to || undefined,
              status: status || undefined,
              search: search || undefined,
            },
          }
        )
      )?.data;
    };

  const { data, isLoading, isError, error } = useQuery<
    BestPerformingCategoryResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: [
      "best-performing-category",
      page,
      interval,
      from,
      to,
      status,
      search,
    ],
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
