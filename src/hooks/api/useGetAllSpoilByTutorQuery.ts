import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserResponse } from "@spt/types/user";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";


const MyFunction =(age:number, gender:string)=>{

}

MyFunction(2,"female")


export const useGetAllSpoilByTutorQuery = (tutor_id:number, page:number) => {
  const fetchSpoil = async (): Promise<UserResponse> => {
    return (await apiCall().get(`/spoils?tutor_id=${tutor_id}&page=${page}&per_page=${20}`))?.data;
  };

  const { data, isLoading,isError, error } = useQuery<
  UserResponse,
  AxiosError<ApiErrorResponse>
>({
    queryKey: ["users",page],
    queryFn: fetchSpoil,
    enabled:!!tutor_id

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
