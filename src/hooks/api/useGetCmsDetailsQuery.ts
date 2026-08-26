import { useQuery } from "@tanstack/react-query";

import type { CmsDetailsResponse } from "@spt/types/cms";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetCmsDetailsQuery = (id: number) => {
  const fetchCmsDetails = async (): Promise<CmsDetailsResponse> => {
    return (await apiCall().get(`/cms/${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CmsDetailsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["cms-details", id],
    queryFn: fetchCmsDetails,
    enabled: !!id,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch page details";

  return {
    data: data?.data,
    isLoading,
    isError,
    cmsDetailsErrorMessage: errorMessage,
  };
};
