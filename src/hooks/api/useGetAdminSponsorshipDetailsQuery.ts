import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { AdminSponsorshipsResponse } from "@spt/types/sponsorship";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAdminSponsorshipDetailsQuery = (id: number) => {
  const fetchAdminSponsorshipDetails = async (): Promise<AdminSponsorshipsResponse> => {
    // return (await apiCall().get(`sponsorships?is_admin=${isAdmin}&spoil_id=${id}`))?.data;
    return (await apiCall().get(`sponsorships?id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    AdminSponsorshipsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["admin-sponsorships", id],
    queryFn: fetchAdminSponsorshipDetails,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch admin sponsorship details";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};