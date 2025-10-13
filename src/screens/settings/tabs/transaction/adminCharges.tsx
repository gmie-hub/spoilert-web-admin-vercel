import type { FC } from "react";

import { Box, Button, Flex, Image, Stack } from "@chakra-ui/react";

import { NoData, SubHeader, Table } from "@spt/components";
import TableHeader from "@spt/partials/tableHeader";
import {
  useAddAdminChargeStore,
  useAdminChargesStore,
} from "@spt/store/transaction";
import type { Metadata3, SettingProps } from "@spt/types/settings";

import AdminChargesTable from "../../table/adminChargesTable";

const AdminCharges: FC<SettingProps> = ({ data }) => {
  const setIsAdminCharge = useAddAdminChargeStore(
    (state) => state.setIsAddAdminCharge
  );

  const { setSettingsId, setAdminChargesData } = useAdminChargesStore();

  const TRANSACTION = "transaction";

  const filteredData = (data || []).filter(
    (item) => item?.section === TRANSACTION
  );
  const adminChargesData = filteredData?.[1]?.metadata as Metadata3[];
  const settingsId = filteredData?.[1]?.id;

  const hasData = adminChargesData?.length > 0;

  const handleAddAdminCharge = () => {
    // Set the settings ID when Add New is clicked
    if (settingsId) {
      setSettingsId(settingsId);
    }
    // Set the current admin charges data in the store
    if (adminChargesData) {
      setAdminChargesData(adminChargesData);
    }
    setIsAdminCharge(true);
  };

  return (
    <Stack gap="6">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        rowGap="6"
      >
        <SubHeader>Admin Charges</SubHeader>

        <Box>
          <Button variant="yellow" onClick={handleAddAdminCharge} px="10">
            <Image src="/add-circle.svg" alt="add" /> Add New
          </Button>
        </Box>
      </Flex>

      {hasData ? (
        <Table
          headerChildren={<TableHeader headerItems={adminChargesHeader} />}
          bodyChildren={<AdminChargesTable items={adminChargesData} />}
        />
      ) : (
        <NoData
          heading="You Haven’t Set Any Admin Charges Yet!"
          description="Set up commission rules based on spoil cost to automatically deduct fees from transactions. "
        >
          <Button variant="yellow" onClick={handleAddAdminCharge}>
            <Image src="/add-circle.svg" alt="add" /> Add Admin Charge
          </Button>
        </NoData>
      )}
    </Stack>
  );
};

export default AdminCharges;

const adminChargesHeader = ["Spoil Price", "Admin Charge", "Action"];
