import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { EnrolledLearnersResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetEnrolledLearnersQuery = (spoilId: number) => {
  const fetchEnrolledLearners =
    async (): Promise<EnrolledLearnersResponse> => {
      return (await apiCall().get(`/spoils/learner/${spoilId}`))?.data;
    };

  const { data, isLoading, isError, error } = useQuery<
    EnrolledLearnersResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["enrolled-learners", spoilId],
    queryFn: fetchEnrolledLearners,
    enabled: !!spoilId,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch enrolled learners";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
