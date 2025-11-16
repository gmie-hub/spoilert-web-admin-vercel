import { Box, Button, HStack, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { CommunitiesDatum } from "@spt/types/community";
import { formatDate } from "@spt/utils/dateTime";

const CommunityOverview = ({ data }: { data: CommunitiesDatum }) => {
  const communityOverviewDetails_1 = [
    { title: "Community Name", value: data?.name },
    { title: "Spoil Title", value: data?.spoil?.title },
    {
      title: "Name of Tutor",
      value: data?.spoil?.tutor
        ? `${data?.spoil?.tutor?.first_name ?? ""} ${data?.spoil?.tutor?.last_name ?? ""}`
        : "N/A",
    },
  ];

  const communityOverviewDetails_2 = [
    { title: "Number of Members", value: data?.total_members.toString() },
    { title: "Date Created", value: formatDate(data?.created_at) },
    {
      title: "Status",
      status: data?.locked === 1 ? "Disabled" : "Active",
    },
  ];

  return (
    <Stack mt="5">
      <Stack gap="6">
        <HStack justifyContent="space-between" alignItems="center">
          <Box>
            <Image src="/user-icon.svg" alt="user" boxSize="14" />
          </Box>

          <Button variant="yellowOutline">View Full Profile</Button>
        </HStack>

        <ProgressInfo>
          {communityOverviewDetails_1.map((item, index) => (
            <InfoDisplay title={item.title} value={item.value} key={index} />
          ))}
        </ProgressInfo>

        <ProgressInfo>
          {communityOverviewDetails_2.map((item, index) => (
            <InfoDisplay title={item.title} value={item.value} key={index} />
          ))}
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            title="Description"
            value={data?.description ?? "No description available"}
          />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default CommunityOverview;
