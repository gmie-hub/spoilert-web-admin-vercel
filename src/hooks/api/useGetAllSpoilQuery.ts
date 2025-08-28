import { useQuery } from "@tanstack/react-query";

import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useGetAllSpoilQuery = () => {
  const fetchAllSpoil = async (): Promise<SpoilsResponse> => {
    return (await apiCall().get("/spoils"))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allSpoil"],
    queryFn: fetchAllSpoil,
  });

  return {
    data: data?.data,
    isLoading
  }
};