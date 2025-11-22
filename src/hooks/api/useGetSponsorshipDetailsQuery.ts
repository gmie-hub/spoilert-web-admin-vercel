import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { SponsorshipDetailsResponse } from "@spt/types/sponsorship";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetSponsorshipDetailsQuery = (id: number) => {
  const fetchAllSponsorship = async (): Promise<SponsorshipDetailsResponse> => {
    return (await apiCall().get(`sponsorships/details?sponsor_id=${id}`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    SponsorshipDetailsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["sponsorship-details"],
    queryFn: fetchAllSponsorship,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch sponsorships details";

  return {
    sponsorshipBreakdownData: data?.data,
    isSponsorshipBreakdownLoading: isLoading,
    sponsorshipBreakdownErrorMessage: errorMessage,
    isSponsorshipBreakdownError: isError,
  };
};
