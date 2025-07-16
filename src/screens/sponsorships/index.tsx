import { useState } from "react";

import { Box, Button, Flex, Image, Stack, Tabs, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { routes } from "@spt/routes";
import { sponsorshipsTabList } from "@spt/utils/sponsorshipData";

import AllSponsorships from "./tabs/allSponsorships";
import CreatedByMe from "./tabs/createdByMe/createdByMe";
import CreatedByMeDetails from "./tabs/createdByMe/createdByMeDetails";

const Sponsorships = () => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () =>
    navigate(routes.main.sponsorships.sponsorASpoil);

  const handleShowDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <Box>
      <Card>
        <Stack gap="4">
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            rowGap="2"
          >
            <Text fontSize="lg" fontWeight="semibold">
              Sponsorships
            </Text>

            <Button variant="yellow" onClick={handleNavigation}>
              <Image src="/discount-circle.svg" /> Sponsor A Spoil
            </Button>
          </Flex>

          <CustomTabs tabList={sponsorshipsTabList}>
            <>
              <Tabs.Content value="allSponsorships">
                <AllSponsorships />
              </Tabs.Content>

              <Tabs.Content value="createdByMe">
                {showDetails ? (
                  <CreatedByMeDetails handleBack={handleShowDetails} />
                ) : (
                  <CreatedByMe handleNavigation={handleShowDetails} />
                )}
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Box>
  );
};

export default Sponsorships;