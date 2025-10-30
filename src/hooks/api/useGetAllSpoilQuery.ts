import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAllSpoilQuery = () => {
  const fetchAllSpoil = async (): Promise<SpoilsResponse> => {
    return (await apiCall().get("/spoils"))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SpoilsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["allSpoil"],
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
