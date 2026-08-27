import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserResponse } from "@spt/types/user";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetTutorsQuery = (search = "") => {
  const fetchTutors = async (): Promise<UserResponse> => {
    return (
      await apiCall().get("/users", {
        params: {
          role: "tutor",
          per_page: 20,
          search: search || undefined,
        },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    UserResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["tutors", search],
    queryFn: fetchTutors,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch tutors";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
