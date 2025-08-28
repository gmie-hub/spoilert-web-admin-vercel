import { useQuery } from "@tanstack/react-query";

import type { SpoilResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useSpoilDetailsQuery = (id: number) => {
  const fetchSpoilDetails = async (): Promise<SpoilResponse> => {
    return (await apiCall().get(`/spoils/${id}`))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["spoilDetails"],
    queryFn: fetchSpoilDetails,
  });

  return {
    data: data?.data,
    isLoading,
  };
};
