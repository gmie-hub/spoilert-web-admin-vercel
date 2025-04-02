import React from "react";

import { Box, HStack, Image, Separator, Stack, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import { firstDetails } from "@spt/utils/learnerData";

const LearnerOverview: React.FC = () => {
  return (
    <Stack mt="5">
      <Stack gap="6">
        <Box>
          <Image src="/user-icon.svg" alt="user" boxSize="14" />
        </Box>

        <HStack
          justifyContent="space-between"
          flexWrap="wrap"
          gap={{ mdDown: "6" }}
        >
          {firstDetails.map((item, index) => (
            <InfoDisplay title={item.title} value={item.value} key={index} />
          ))}
        </HStack>

        <Separator />

        <HStack
          justifyContent="space-between"
          flexWrap="wrap"
          gap={{ mdDown: "6" }}
        >
          <InfoDisplay title="Date Joined" value="12-02-2025" />
          <InfoDisplay title="Last Login" value="21-02-2025" />

          <Stack alignItems="flex-start" flex="1">
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
              Status
            </Text>

            <Tag status="Active" />
          </Stack>
        </HStack>

        <Separator />
      </Stack>
    </Stack>
  );
};

export default LearnerOverview;
