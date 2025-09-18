import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { LearnerSpoilOverviewResponse } from "@spt/types/spoilProgress";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useLearnerSpoilOverviewQuery = (id: number) => {
  const fetchSpoilOverview = async (): Promise<LearnerSpoilOverviewResponse> => {
    return (await apiCall().get(`/spoils/learner/overview?user_id=${id}`))?.data;
  };

  const { data, isLoading,isError, error } =  useQuery<
  LearnerSpoilOverviewResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["spoilOverview"],
    queryFn: fetchSpoilOverview,
  });

  const errorMessage =
  error?.response?.data?.message ||
  error?.message ||
  "Failed to fetch quizzes details";

  return {
    overviewData: data?.data,
    isOverviewLoading: isLoading,
    overviewErrorMessage: errorMessage,
    overviewIsError:isError,
  };
};
