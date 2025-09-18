import type { FC } from "react";

import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { BackButton, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useSpoilProgressQuery } from "@spt/hooks/api/useGetSpoilProgressQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { formatDate } from "@spt/utils/dateTime";


interface ComponentProps {
  handleBack: () => void;
  handleNavigation?: () => void;
  showButton?: boolean;
}

const ProgressDetails: FC<ComponentProps> = ({
  handleBack,
  handleNavigation,
  showButton,
}) => {
  const { spoil_id } = useParams();

  const { id } = useParams();


  

  const { data, isLoading, isError, errorMessage } = useSpoilProgressQuery(Number(spoil_id),
    Number(id)
  );
  if (isLoading) return <LoadingState />;
  if (isError) <ErrorState error={errorMessage} />;


  return (
    <Stack mt="6" gap="6">
      <HStack justifyContent="space-between" alignItems="center">
        <BackButton handleNavigation={handleBack} />

        {showButton && (
          <Button variant="yellowOutline" onClick={handleNavigation}>
            View Learner's Profile
          </Button>
        )}
      </HStack>

      <Stack gap="6">
        <Text fontSize="xl" fontWeight="medium">
          Progress Details
        </Text>

        <Flex
          flexDir={{ base: "column", md: "row" }}
          gap="10"
          alignItems="stretch"
        >
          <Box w={{ base: "100%", md: "55%" }} h="inherit">
            <Card px="2" pt="8">
              <Stack mx="6" gap="7" h="100%">
                <ProgressInfo>
                  <Text fontSize="xl" fontWeight="medium">
                    Progress
                  </Text>
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Progress"
                    value={`${data?.learner_spoil?.progress_percentage ?? 0}%`}                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Overall Modules"
                    value={data?.modules_no}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Modules Completed"
                    value={data?.total_modules_completed}
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Modules Pending"
                    value={data?.total_modules_pending}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex="1"
                    title="Current Module"
                    value={data?.current_module}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex="1"
                    title="Current Lesson"
                    value={data?.current_lesson}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Pre-Spoil Quiz Score"
                    value={data?.pre_spoil_quiz?.highest_score}
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Post-Spoil Quiz Score"
                    value={data?.post_spoil_quiz?.highest_score}
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Date Enrolled"
                    value={ formatDate(data?.created_at)}
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Date Completed"
                    value="25-02-2025"
                  />
                </ProgressInfo>
              </Stack>
            </Card>
          </Box>

          <Box w={{ base: "100%", md: "45%" }} h="100%">
            <Card px="2" pt="8">
              <Stack mx="6" gap="7" mb="8">
                <ProgressInfo>
                  <Text fontSize="xl" fontWeight="medium">
                    Progress Breakdown
                  </Text>
                </ProgressInfo>

                {data?.modules.map((item, index) => (
                  <ProgressInfo key={index}>
                    <InfoDisplay
                      md="sm"
                      flex="1"
                      title={`module ${index + 1} (${item?.lessons?.length} ${item?.lessons?.length > 1 ? "lessons" : "lesson"})`}
                      value={item.title}
                      status={item.status}
                    />
                  </ProgressInfo>
                ))}
              </Stack>
            </Card>
          </Box>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default ProgressDetails;