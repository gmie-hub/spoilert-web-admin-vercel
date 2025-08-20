import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetQuizBySpoilId = (id: number) => {
  const fetchQuiz = async () => {
    return (await apiCall().get(`quiz?spoil_id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    any,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["getQuizBySpoilId"],
    queryFn: fetchQuiz,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch quizzes details";

  return {
    quizData: data,
    isQuizLoading: isLoading,
    isQuizErrorMessage: errorMessage,
    isError,
  };
};
