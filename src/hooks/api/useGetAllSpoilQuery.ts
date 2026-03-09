import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAllSpoilQuery = (page?: number, search?: string) => {
  const fetchAllSpoil = async (): Promise<SpoilsResponse> => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    return (
      await apiCall().get(`/spoils?per_page=${20}&page=${page}${searchParam}`)
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["allSpoil", page, search],
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
