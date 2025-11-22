import { useQuery } from "@tanstack/react-query";

import type { CommunityUserResponse } from "@spt/types/community";
import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export const useGetCommunityUsersQuery = (communityId?: number) => {
  const isEnabled = typeof communityId === "number" && !Number.isNaN(communityId);

  const fetchCommunityUsers = async (): Promise<CommunityUserResponse> => {
    const response = await apiCall().get(
      `/communities/user?community_id=${communityId}`
    );

    return response?.data;
  };

  const { data, isLoading, isError, error } = useQuery<
  CommunityUserResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["community-users", communityId],
    queryFn: fetchCommunityUsers,
    enabled: isEnabled,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch community users";

  return {
    communityUserData: data?.data?.data ?? [],
    communityUserPagination: data?.data,
    isCommunityUserLoading: isLoading,
    communityUserErrorMessage: errorMessage,
    isCommunityUserError: isError,
  };
};
