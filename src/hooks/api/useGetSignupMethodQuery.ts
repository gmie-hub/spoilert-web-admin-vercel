import { useQuery } from "@tanstack/react-query";

import type { SignupMethodResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetSignupMethodQuery = () => {
  const fetchSignupMethod = async (): Promise<SignupMethodResponse> => {
    return (await apiCall().get(`/analytics/user/group/signup_method`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SignupMethodResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["signup-method"],
    queryFn: fetchSignupMethod,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch sign up methods";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
