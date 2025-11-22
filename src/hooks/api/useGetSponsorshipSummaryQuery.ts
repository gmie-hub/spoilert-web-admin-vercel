import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SponsorshipsResponse } from "@spt/types/sponsorship";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetSponsorshipSummaryQuery = (id: number) => {
  const fetchAllSponsorship = async (): Promise<SponsorshipsResponse> => {
    return (await apiCall().get(`sponsorships/summary?sponsor_id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SponsorshipsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["sponsorships-summary"],
    queryFn: fetchAllSponsorship,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch sponsorships details";

  return {
    sponsorshipDetailsData: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};