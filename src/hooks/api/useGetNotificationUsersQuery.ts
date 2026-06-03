import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { UserResponse } from "@spt/types/user";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetNotificationUsersQuery = (search = "") => {
  const fetchUsers = async (): Promise<UserResponse> => {
    return (
      await apiCall().get(`/users`, {
        params: { per_page: 20, search: search || undefined },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    UserResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["notificationUsers", search],
    queryFn: fetchUsers,
  });

  const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to fetch users";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
