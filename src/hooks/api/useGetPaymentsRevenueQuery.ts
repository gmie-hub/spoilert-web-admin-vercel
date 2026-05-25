import { useQuery } from "@tanstack/react-query";

import type { PaymentsRevenueResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetPaymentsRevenueQuery = () => {
  const fetchPaymentsRevenue = async (): Promise<PaymentsRevenueResponse> => {
    return (await apiCall().get(`/analytics/payments/group/revenue`))?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    PaymentsRevenueResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["payments-revenue"],
    queryFn: fetchPaymentsRevenue,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch revenue";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
