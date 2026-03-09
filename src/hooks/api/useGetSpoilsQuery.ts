import { useQuery } from "@tanstack/react-query";

import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useGetSpoilsQuery = (page: number, search?: string) => {
  const fetchPendingSpoils = async (): Promise<SpoilsResponse> => {
    const perPage = 20;
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    const url = `/spoils?status=0&page=${page}&per_page=${perPage}${searchParam}`;
    return (await apiCall().get(url))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["pendingSpoils", page, search ?? ""],
    queryFn: fetchPendingSpoils,
  });

  return {
    data: data?.data,
    isLoading,
  };
};
