import { useQuery } from "@tanstack/react-query";

import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useGetSpoilsQuery = () => {
  const fetchPendingSpoils = async (): Promise<SpoilsResponse> => {
    // return (await apiCall().get("/spoils"))?.data;
    return (await apiCall().get("/spoils?status=0"))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pendingSpoils"],
    queryFn: fetchPendingSpoils
  })

  return {
    data: data?.data,
    isLoading
  }
};
