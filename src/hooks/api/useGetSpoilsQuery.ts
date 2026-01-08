import { useQuery } from "@tanstack/react-query";

import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useGetSpoilsQuery = (page:number) => {
  const fetchPendingSpoils = async (): Promise<SpoilsResponse> => {
    // return (await apiCall().get("/spoils"))?.data;
    return (await apiCall().get(`/spoils?status=0&page=${page}&per_page=${20}`))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pendingSpoils", page],
    queryFn: fetchPendingSpoils
  })  

  return {
    data: data?.data,
    isLoading
  }
};
