import type { FC } from "react";

import { Box, Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";

import { BackButton, Card } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { progressBreakdownData } from "@spt/utils/learnerData";

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
                    value="100%"
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Overall Modules"
                    value="5"
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Modules Completed"
                    value="5"
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Modules Pending"
                    value="0"
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex="1"
                    title="Current Module"
                    value="Module 3- Introduction to Design"
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex="1"
                    title="Current Lesson"
                    value="What is design"
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Pre-Spoil Quiz Score"
                    value="2500"
                  />
                  <InfoDisplay
                    flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
                    title="Post-Spoil Quiz Score"
                    value="-"
                  />
                </ProgressInfo>

                <ProgressInfo>
                  <InfoDisplay
                    flex={{ base: "0 0 25%", md: "0 0 25%" }}
                    title="Date Enrolled"
                    value="12-02-2025"
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

                {progressBreakdownData.map((item, index) => (
                  <ProgressInfo key={index}>
                    <InfoDisplay
                      md="sm"
                      flex="1"
                      title={item.heading}
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