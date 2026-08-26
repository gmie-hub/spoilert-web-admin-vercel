import { useQuery } from "@tanstack/react-query";

import type { CmsResponse } from "@spt/types/cms";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAllCmsQuery = (page: number, search = "") => {
  const fetchCms = async (): Promise<CmsResponse> => {
    return (
      await apiCall().get(`/cms`, {
        params: { page, per_page: 20, search: search || undefined },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    CmsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["cms", page, search],
    queryFn: fetchCms,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch CMS pages";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
