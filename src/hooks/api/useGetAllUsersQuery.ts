import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserResponse } from "@spt/types/user";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";


export const useGetAllUsersQuery = (role:string, page: number) => {
  const fetchUsers = async (): Promise<UserResponse> => {
    return (await apiCall().get(`/users?role=${role}&page=${page}&per_page=${20}`))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  UserResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["users",page],
    queryFn: fetchUsers
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
