import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

/**
 * @param isActive filter by status — 0 returns disabled spoils, 1 returns
 * active ones. Omit it to get every spoil regardless of status.
 */
export const useGetAllSpoilQuery = (
  page?: number,
  search?: string,
  isActive?: 0 | 1,
) => {
  const fetchAllSpoil = async (): Promise<SpoilsResponse> => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const activeParam = isActive === undefined ? "" : `&is_active=${isActive}`;
    return (
      await apiCall().get(
        `/spoils?per_page=${20}&page=${page}${searchParam}${activeParam}`,
      )
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["allSpoil", page, search, isActive],
    queryFn: fetchAllSpoil,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch spoils";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
