import { useQuery } from "@tanstack/react-query";

import type { VerificationResponse } from "@spt/types/verification";
import apiCall from "@spt/utils/apiCall";

export const useAllPendingVerification = () => {
  const fetchPendingVerifications = async ():Promise<VerificationResponse> => {
    return (await apiCall().get("/verifications"))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allPendingVerification"],
    queryFn: fetchPendingVerifications
  })

  return {
    data: data?.data,
    isLoading
  }
};
