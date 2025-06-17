import { Box, Button, Flex, Image, Stack, Tabs, Text } from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { sponsorshipsTabList } from "@spt/utils/sponsorshipData";

import AllSponsorships from "./tabs/allSponsorships";

const Sponsorships = () => {
  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              Sponsorships
            </Text>

            <Button variant="yellow">
              <Image src="/discount-circle.svg" /> Sponsor A Spoil
            </Button>
          </Flex>

          <CustomTabs tabList={sponsorshipsTabList}>
            <>
              <Tabs.Content value="allSponsorships">
                <AllSponsorships />
              </Tabs.Content>

              <Tabs.Content value="createdByMe"></Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Box>
  );
};

export default Sponsorships;
