import { useQuery } from "@tanstack/react-query";

import type { SpoilsResponse } from "@spt/types/spoils";
import apiCall from "@spt/utils/apiCall";

export const useGetAllCategoriesQuery = () => {
  const fetchCategories = async (): Promise<SpoilsResponse> => {
    return (await apiCall().get("/categories"))?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories
  })

  return {
    data: data?.data,
    isLoading
  }
};
