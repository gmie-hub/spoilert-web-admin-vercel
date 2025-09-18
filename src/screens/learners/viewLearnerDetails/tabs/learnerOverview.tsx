import React from "react";

import { Box, Image, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useGetAllUserDetailsQuery } from "@spt/hooks/api/useGetUserDetailsQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { formatDate } from "@spt/utils/dateTime";

const LearnerOverview: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, isError, errorMessage } = useGetAllUserDetailsQuery(
    Number(id)
  );

  
  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  
  return (
    <Stack mt="5">
      <Stack gap="6">
        <Box>
          <Image src={data?.avatar || "/user-icon.svg"} alt="user" boxSize="14" />
        </Box>

        <ProgressInfo>
          <InfoDisplay
            title="Full Name"
            value={`${data?.first_name ?? ""} ${data?.middie_name ?? ""} ${data?.last_name ?? ""}`}
          />
          <InfoDisplay title="Username" value={data?.username} />
          <InfoDisplay title="Email Address" value={data?.email} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Date Joined" value={formatDate(data?.created_at)} />
          <InfoDisplay title="Last Login" value={formatDate(data?.last_login)} />
          <InfoDisplay
            title="Status"
            value=""
            status={data?.is_active?.toString()}
          />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default LearnerOverview;
