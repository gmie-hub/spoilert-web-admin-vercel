import { useQuery } from "@tanstack/react-query";

import type { UserTypeSignupResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface UserTypeSignupsParams {
  from?: string;
  to?: string;
  interval?: "daily" | "weekly" | "monthly";
}

export const useGetUserTypeSignupsQuery = ({
  from,
  to,
  interval,
}: UserTypeSignupsParams = {}) => {
  const fetchUserTypeSignups = async (): Promise<UserTypeSignupResponse> => {
    return (
      await apiCall().get(`/analytics/user/group/signup/user-type`, {
        params: { from, to, interval },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    UserTypeSignupResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["user-type-signups", from, to, interval],
    queryFn: fetchUserTypeSignups,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch learner & tutor sign ups";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
