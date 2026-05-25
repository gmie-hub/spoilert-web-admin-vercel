import { useQuery } from "@tanstack/react-query";

import type { BestPerformingResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetBestPerformingQuery = () => {
  const fetchBestPerforming = async (): Promise<BestPerformingResponse> => {
    return (await apiCall().get(`/analytics/spoil/group/best-performing`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    BestPerformingResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["best-performing-spoil"],
    queryFn: fetchBestPerforming,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch best performing spoils";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
