import { useQuery } from "@tanstack/react-query";

import type { VerificationResponse } from "@spt/types/verification";
import apiCall from "@spt/utils/apiCall";

export const usePendingVerificationQuery = (id: number) => {
  const fetchPendingVerification = async (): Promise<VerificationResponse> => {
    return (await apiCall().get(`/verifications/${id}`))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pendingVerification"],
    queryFn: fetchPendingVerification,
  });

  return {
    data: data?.data,
    isLoading,
  };
};
