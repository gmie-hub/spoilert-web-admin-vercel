import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useSpoilDetailsQuery = (id: number) => {
  const fetchSpoilDetails = async (): Promise<SpoilResponse> => {
    return (await apiCall().get(`/spoils/${id}`))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  SpoilResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["spoilDetails"],
    queryFn: fetchSpoilDetails,
    enabled:!!id
  });
  
  const errorMessage =
  error?.response?.data?.message ||
  error?.message ||
  "Failed to fetch Users";


  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage
  };
};
