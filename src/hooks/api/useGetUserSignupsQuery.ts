import { useQuery } from "@tanstack/react-query";

import type { UserSignupsResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetUserSignupsQuery = () => {
  const fetchUserSignups = async (): Promise<UserSignupsResponse> => {
    return (await apiCall().get(`/analytics/user/group/signup`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    UserSignupsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["user-signups"],
    queryFn: fetchUserSignups,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch user signups";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
