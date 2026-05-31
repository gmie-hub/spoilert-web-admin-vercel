import { useQuery } from "@tanstack/react-query";

import type { UserSignupsResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface UserSignupsParams {
  from?: string;
  to?: string;
  interval?: "daily" | "weekly" | "monthly";
}

export const useGetUserSignupsQuery = ({
  from,
  to,
  interval,
}: UserSignupsParams = {}) => {
  const fetchUserSignups = async (): Promise<UserSignupsResponse> => {
    return (
      await apiCall().get(`/analytics/user/group/signup`, {
        params: { from, to, interval },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    UserSignupsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["user-signups", from, to, interval],
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
