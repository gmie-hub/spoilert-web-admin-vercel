import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { QuizDetailsResponse } from "@spt/types/quiz";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetQuizDetailsQuery = (quizId: number) => {
  const fetchQuizDetails = async (): Promise<QuizDetailsResponse> => {
    return (await apiCall().get(`quiz/${quizId}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    QuizDetailsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["getQuizDetails", quizId],
    queryFn: fetchQuizDetails,
    enabled: !!quizId,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch quizzes details";

  return {
    quizDetailsData: data?.data,
    isQuizDetailsLoading: isLoading,
    quizDetailsErrorMessage: errorMessage,
    isQuizDetailsError: isError,
  };
};
