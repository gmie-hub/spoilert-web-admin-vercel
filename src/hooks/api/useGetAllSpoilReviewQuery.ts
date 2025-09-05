import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SpoilReviewResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAllSpoilReviewQuery = (id: number) => {
  const fetchAllSpoilReview = async (): Promise<SpoilReviewResponse> => {
    return (await apiCall().get(`reviews?spoil_id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
  SpoilReviewResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["allReviews"],
    queryFn: fetchAllSpoilReview,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch spoil review";

  return {
    data: data?.data,
     isLoading,
    reviewErrorMessage: errorMessage,
    isError,
  };
};
