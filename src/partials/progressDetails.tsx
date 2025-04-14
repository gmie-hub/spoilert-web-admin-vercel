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
          <Button variant="yellowOutline" onClick={handleNavigation}>View Learner's Profile</Button>
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
            <Card>
              <Stack mx="6" gap="7" h="100%">
                <ProgressInfo>
                  <Text>Progress</Text>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay title="Progress" value="100%" />
                    <InfoDisplay title="Overall Modules" value="5" />
                  </HStack>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay title="Modules Completed" value="5" />
                    <InfoDisplay title="Modules Pending" value="0" />
                  </HStack>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay
                      title="Current Module"
                      value="Module 3- Introduction to Design"
                    />
                  </HStack>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay
                      title="Current Lesson"
                      value="What is design"
                    />
                  </HStack>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay title="Pre-Spoil Quiz Score" value="2500" />
                    <InfoDisplay title="Post-Spoil Quiz Score" value="-" />
                  </HStack>
                </ProgressInfo>

                <ProgressInfo>
                  <HStack>
                    <InfoDisplay title="Date Enrolled" value="12-02-2025" />
                    <InfoDisplay title="Date Completed" value="25-02-2025" />
                  </HStack>
                </ProgressInfo>
              </Stack>
            </Card>
          </Box>

          <Box w={{ base: "100%", md: "45%" }} h="100%">
            <Card>
              <Stack mx="6" gap="7" mb="8">
                {progressBreakdownData.map((item, index) => (
                  <ProgressInfo key={index}>
                    <InfoDisplay
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
