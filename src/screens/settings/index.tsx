import { Heading, Stack, Tabs } from "@chakra-ui/react";

import { Card } from "@spt/components";
import CustomTabs from "@spt/components/tabs";
import { useEditStore } from "@spt/store";
import { useAddAdminChargeStore } from "@spt/store/transaction";

import EditProfile from "./tabs/editProfile";
import General from "./tabs/general";
import Profile from "./tabs/profile";
import Transaction from "./tabs/transaction";
import AddAdminCharge from "./tabs/transaction/addAdminCharge";

const Settings = () => {
  const isEdit = useEditStore((state) => state.isEdit);
  const isAddAdminCharge = useAddAdminChargeStore(
    (state) => state.isAddAdminCharge
  );

  return (
    <Card>
      <Stack mb="2" gap={{ base: "6", md: "4" }}>
        <Heading size={{ base: "md", md: "xl" }}>Settings</Heading>

        <CustomTabs tabList={tabList}>
          <>
            <Tabs.Content value="profile">
              {isEdit ? <EditProfile /> : <Profile />}
            </Tabs.Content>

            <Tabs.Content value="general">
              <General />
            </Tabs.Content>

            <Tabs.Content value="transaction">
              {isAddAdminCharge ? <AddAdminCharge /> : <Transaction />}
            </Tabs.Content>

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
