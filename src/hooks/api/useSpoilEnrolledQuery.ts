import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserSpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";



export const useGetAllUserSpoilsQuery = (user_id:number, page:number) => {
  const fetchUsers = async (): Promise<UserSpoilsResponse> => {
    return (await apiCall().get(`/spoils/learner?user_id=${user_id}&page=${page}`))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  UserSpoilsResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["users-spoil",page],
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
