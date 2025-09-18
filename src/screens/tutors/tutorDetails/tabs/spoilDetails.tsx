import type { FC } from "react";

import { Box, Button, Flex, List, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { BackButton } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useSpoilDetailsQuery } from "@spt/hooks/api/useSpoilDetailsQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  handleNavigation: () => void;
  handleViewEnrolled: () => void;
}

const SpoilDetails: FC<ComponentProps> = ({
  handleNavigation,
  handleViewEnrolled,
}) => {
  const { spoil_id } = useParams();

  const { data, isLoading, isError, errorMessage } = useSpoilDetailsQuery(
    Number(spoil_id)
  );

  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;

  return (
    <Stack gap="5" mt="3">
      <Flex
        flexDir={{ mdDown: "column" }}
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <BackButton handleNavigation={handleNavigation} />

        <Flex flexDir={{ mdDown: "column" }} gap="3">
          <Button variant="yellow" onClick={handleViewEnrolled}>
            View Enrolled Learners
          </Button>
          <Button variant="yellowOutline">View Full Spoil Details</Button>
        </Flex>
      </Flex>

      <Text fontSize={{ md: "xl" }} fontWeight="medium">
        Spoil Details
      </Text>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay title="Spoil Title" value={data?.title} />
          <InfoDisplay title="Category" value={data?.category} />
          <InfoDisplay title="University" value="University of Lagos" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Course Code" value={data?.course_code} />
          <InfoDisplay title="Price" value={data?.pricing} />
          <InfoDisplay title="Amount" value={`N ${data?.amount ?? 0}`} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Modules" value={data?.modules_no} />
          <InfoDisplay title="Lessons" value={data?.lessons_no} />
          <InfoDisplay title="Enrolled Learners" value={data?.enrolled_users} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            title="Date Created"
            value={formatDate(data?.created_at)}
          />
          <InfoDisplay title="Amount Earned" value="N200,000" />
          <InfoDisplay title="Status" status={data?.status?.toString()} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ base: "0 0 25%", md: "0 0 25%" }}
            title="No of Likes"
            value={data?.likes_count}
          />

          <InfoDisplay
            flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
            title="No of Shares"
            value={data?.shares_count}
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ md: "0 0 100%" }}
            title="Description"
            value={data?.description}
          />
        </ProgressInfo>

        <Stack>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
            What they will learn
          </Text>

          <Box ms="6">
            <List.Root>
              {data?.what_to_tearn
                ?.split("\n\n") // split by double newlines
                .map((item, index) => (
                  <List.Item key={index} _marker={{ color: "#212529" }}>
                    {item.trim()} {/* remove extra spaces */}
                  </List.Item>
                ))}
            </List.Root>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SpoilDetails;
