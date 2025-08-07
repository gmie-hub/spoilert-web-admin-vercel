import type { FC } from "react";

import { Box, Button, Flex, List, Stack, Text } from "@chakra-ui/react";

import { BackButton } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { whatToLearnData } from "@spt/utils/spoilData";

interface ComponentProps {
  handleNavigation: () => void;
  handleViewEnrolled: () => void;
}

const SpoilDetails: FC<ComponentProps> = ({
  handleNavigation,
  handleViewEnrolled,
}) => {
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
          <InfoDisplay
            title="Spoil Title"
            value="Understanding Design Principles"
          />
          <InfoDisplay title="Category" value="UI/UX Design" />
          <InfoDisplay title="University" value="University of Lagos" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Course Code" value="CHM 404" />
          <InfoDisplay title="Price" value="Paid" />
          <InfoDisplay title="Amount" value="N15,000" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Modules" value="5" />
          <InfoDisplay title="Lessons" value="10" />
          <InfoDisplay title="Enrolled Learners" value="N10" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Date Created" value="12-02-2025" />
          <InfoDisplay title="Amount Earned" value="N200,000" />
          <InfoDisplay title="Status" status="Active" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ base: "0 0 25%", md: "0 0 25%" }}
            title="No of Likes"
            value="30"
          />

          <InfoDisplay
            flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
            title="No of Shares"
            value="10"
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ md: "0 0 100%" }}
            title="Description"
            value="This course is for aspiring product designers"
          />
        </ProgressInfo>

        <Stack>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
            What they will learn
          </Text>

          <Box ms="6">
            <List.Root>
              <List.Item>
                {whatToLearnData.map((item, index) => (
                  <List.Item key={index} _marker={{ color: "#212529" }}>
                    {item}
                  </List.Item>
                ))}
              </List.Item>
            </List.Root>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SpoilDetails;