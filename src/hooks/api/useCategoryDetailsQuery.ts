import { useQuery } from "@tanstack/react-query";

import type { CategoryDetailsResponse } from "@spt/types/category";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useCategoryDetailsQuery = (id: number) => {
  const fetchCategoryDetails = async (): Promise<CategoryDetailsResponse> => {
    return (await apiCall().get(`categories/${id}`))?.data;
  };

  const { data, isLoading, error, isError } = useQuery<
    CategoryDetailsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["category-details"],
    queryFn: fetchCategoryDetails,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Error fetching category details";

  return {
    categoryDetailsData: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
