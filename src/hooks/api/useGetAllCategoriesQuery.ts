import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { CategoryResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";


export const useGetAllCategoriesQuery = () => {
  const fetchCategories = async (): Promise<CategoryResponse> => {
    return (await apiCall().get("/categories"))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  CategoryResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["categories"],
    queryFn: fetchCategories
  })

  
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch categories";


  return {
    data: data?.data,
    isLoading,
    categoryErrorMessage: errorMessage,
    isError,
  }
};
