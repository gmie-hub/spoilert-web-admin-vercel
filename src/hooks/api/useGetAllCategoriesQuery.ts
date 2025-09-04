import { useQuery } from "@tanstack/react-query";

import type { CategoriesResponse } from "@spt/types/category";
import apiCall from "@spt/utils/apiCall";

export const useGetAllCategoriesQuery = () => {
  const fetchCategories = async (): Promise<CategoriesResponse> => {
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
