import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { MailsResponse } from "@spt/types/mailing";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetMailsQuery = (page: number, search = "") => {
  const fetchMails = async (): Promise<MailsResponse> => {
    return (
      await apiCall().get(`/mails`, {
        params: { page, per_page: 20, search: search || undefined },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    MailsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["mails", page, search],
    queryFn: fetchMails,
  });

  const errorMessage =
    error?.response?.data?.message || error?.message || "Failed to fetch mails";

  return {
    data: data?.data,
    isLoading,
    isError,
    errorMessage,
  };
};
