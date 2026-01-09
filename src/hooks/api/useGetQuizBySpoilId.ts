import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { QuizResponse } from "@spt/types/quiz";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetQuizBySpoilId = (id: number) => {
  const fetchQuiz = async (): Promise<QuizResponse> => {
    return (await apiCall().get(`quiz?spoil_id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    QuizResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["getQuizBySpoilId", id],
    queryFn: fetchQuiz,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch quizzes details";

  return {
    quizData: data?.data?.data,
    isQuizLoading: isLoading,
    quizErrorMessage: errorMessage,
    isError,
  };
};
