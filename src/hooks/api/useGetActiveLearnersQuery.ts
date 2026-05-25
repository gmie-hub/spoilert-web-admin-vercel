import { useQuery } from "@tanstack/react-query";

import type { ActiveLearnersResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetActiveLearnersQuery = () => {
  const fetchActiveLearners = async (): Promise<ActiveLearnersResponse> => {
    return (await apiCall().get(`/analytics/user/group/active_learners`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    ActiveLearnersResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["active-learners"],
    queryFn: fetchActiveLearners,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch active learners";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
