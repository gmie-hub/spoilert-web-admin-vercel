import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { ReportType, ReportsApiResponse } from "@spt/types/report";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

/**
 * Fetches reports from GET /reports.
 * Pass `type` ("spoil" | "tutor") to filter reports by type and `page` for
 * server-side pagination. `T` types the (paginated) `data` payload.
 */
export const useGetReportsQuery = <T = unknown>(type: ReportType, page = 1) => {
  const fetchReports = async (): Promise<ReportsApiResponse<T>> => {
    return (
      await apiCall().get(`/reports`, {
        params: { type, page, per_page: 20 },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    ReportsApiResponse<T>,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["reports", type, page],
    queryFn: fetchReports,
    enabled: !!type,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch reports";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};

export default useGetReportsQuery;
