import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SettingsResponse } from "@spt/types/settings";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useSettingsQuery = () => {
  const fetchSettings = async (): Promise<SettingsResponse> => {
    return (await apiCall().get("admin/settings"))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SettingsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["get-settings"],
    queryFn: fetchSettings,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch settings";

  return {
    data,
    isLoading,
    isError,
    errorMessage,
  };
};
