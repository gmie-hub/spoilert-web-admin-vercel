import { useQuery } from "@tanstack/react-query";

import type { VerificationsResponse } from "@spt/types/verification";
import apiCall from "@spt/utils/apiCall";

export const useAllPendingVerification = () => {
  const fetchPendingVerifications = async ():Promise<VerificationsResponse> => {
    return (await apiCall().get("/verifications?status=0"))?.data;
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
