import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import type { PaymentType, PaymentsResponse } from "@spt/types/payments";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetPaymentsQuery = (
  type: PaymentType,
  page: number,
  status?: string,
  search?: string
) => {
  const fetchPayments = async (): Promise<PaymentsResponse> => {
    const statusParam = status ? `&status=${status}` : "";
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
    return (
      await apiCall().get(
        `payments?type=${type}&page=${page}&per_page=${20}${statusParam}${searchParam}`
      )
    )?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    PaymentsResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["payments", type, page, status, search],
    queryFn: fetchPayments,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch payments";

  return {
    data: data?.data,
    isLoading,
    errorMessage,
    isError,
  };
};
