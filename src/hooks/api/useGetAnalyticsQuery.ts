import { useQuery } from "@tanstack/react-query";

import type { DashboardAnalyticsResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAnalyticsQuery = () => {
  const fetchAnalytics = async (): Promise<DashboardAnalyticsResponse> => {
    return (await apiCall().get(`/analytics/summary`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    DashboardAnalyticsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch analytics";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
