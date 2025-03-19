import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Stack,
  Tabs,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";

import LearnerOverview from "./tabs/learnerOverview";

const ViewLearnerDetails = () => {
  return (
    <Box>
      View learner details
      <Card>
        <Stack>
          <HStack justifyContent="space-between">
            <Heading size="lg">Learner Details</Heading>

            <Button dangerOutline px="8">
              <Image src="/trash.svg" alt="delete" /> Delete Account
            </Button>
          </HStack>

          <CustomTabs tabList={tabList}>
            <>
              <Tabs.Content value="learnerOverview">
                <LearnerOverview />
              </Tabs.Content>
              <Tabs.Content value="spoilsEnrolled"></Tabs.Content>
              <Tabs.Content value="sponsorshipUsed"></Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Box>
  );
};

export default ViewLearnerDetails;

const tabList = [
  {
    value: "learnerOverview",
    text: "Learner Overview",
  },
  {
    value: "spoilsEnrolled",
    text: "Spoils Enrolled & Progress",
  },
  {
    value: "sponsorshipUsed",
    text: "Sponsorship Used",
  },
];
