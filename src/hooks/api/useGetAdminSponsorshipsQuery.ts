import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { AdminSponsorshipsResponse } from "@spt/types/sponsorship";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetAdminSponsorshipsQuery = () => {
  const fetchAllAdminSponsorship = async (): Promise<AdminSponsorshipsResponse> => {
    return (await apiCall().get("sponsorships?is_admin=1"))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    AdminSponsorshipsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["admin-sponsorships"],
    queryFn: fetchAllAdminSponsorship,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch admin sponsorships";

  return {
    adminSponsorshipData: data?.data,
    isAdminSponsorshipLoading: isLoading,
    adminSponsorshipErrorMessage: errorMessage,
    isAdminSponsorshipError: isError,
  };
};
