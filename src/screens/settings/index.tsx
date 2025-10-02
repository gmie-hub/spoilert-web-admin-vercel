import { Heading, Stack, Tabs } from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";

import Profile from "./tabs/profile";

const Settings = () => {
  return (
    <Card>
      <Stack mb="2" gap={{ base: "6", md: "4" }}>
        <Heading size={{ base: "sm", md: "lg" }}>Settings</Heading>

        <CustomTabs tabList={tabList}>
          <>
            <Tabs.Content value="profile">
              <Profile />
            </Tabs.Content>

            <Tabs.Content value="general"></Tabs.Content>

            <Tabs.Content value="transaction"></Tabs.Content>

            <Tabs.Content value="security"></Tabs.Content>
          </>
        </CustomTabs>
      </Stack>
    </Card>
  );
};

export default Settings;

const tabList = [
  {
    value: "profile",
    text: "Profile Settings",
  },
  {
    value: "general",
    text: "General Settings",
  },
  {
    value: "transaction",
    text: "Transaction Settings",
  },
  {
    value: "security",
    text: "Security Settings",
  },
];
