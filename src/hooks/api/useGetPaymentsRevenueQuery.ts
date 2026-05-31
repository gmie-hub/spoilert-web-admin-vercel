import { useQuery } from "@tanstack/react-query";

import type { PaymentsRevenueResponse } from "@spt/types/analytics";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface PaymentsRevenueParams {
  interval?: "daily" | "weekly" | "monthly";
  year?: string;
}

export const useGetPaymentsRevenueQuery = ({
  interval,
  year,
}: PaymentsRevenueParams = {}) => {
  const fetchPaymentsRevenue = async (): Promise<PaymentsRevenueResponse> => {
    return (
      await apiCall().get(`/analytics/payments/group/revenue`, {
        params: { interval, year },
      })
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    PaymentsRevenueResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["payments-revenue", interval, year],
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
