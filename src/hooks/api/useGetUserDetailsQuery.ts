import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserDetailsResponse } from "@spt/types/user";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";


export const useGetAllUserDetailsQuery = (id:number) => {
  const fetchCategories = async (): Promise<UserDetailsResponse> => {
    return (await apiCall().get(`/users/${id}`))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  UserDetailsResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["user-details"],
    queryFn: fetchCategories
  })

  
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch Users";


  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  }
};
