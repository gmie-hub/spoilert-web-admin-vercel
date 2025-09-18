import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilProgressResponse } from "@spt/types/spoilProgress";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useSpoilProgressQuery = (spoil_id:number,id: number) => {
  const fetchSpoilProgress = async (): Promise<SpoilProgressResponse> => {
    return (await apiCall().get(`spoils/${spoil_id}?user_id=${id}`))?.data;
  };

  const { data, isLoading,isError, error} =  useQuery<
  SpoilProgressResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["spoil-progress"],
    queryFn: fetchSpoilProgress,
    enabled:!!spoil_id
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
