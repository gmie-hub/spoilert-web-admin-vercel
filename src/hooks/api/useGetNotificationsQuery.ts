import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { NotificationsResponse } from "@spt/types/notification";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetNotificationsQuery = (page: number, search = "") => {
  const fetchNotifications = async (): Promise<NotificationsResponse> => {
    return (
      await apiCall().get(`/notifications`, {
        params: { page, per_page: 20, search: search || undefined },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    NotificationsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["notifications", page, search],
    queryFn: fetchNotifications,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch notifications";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
