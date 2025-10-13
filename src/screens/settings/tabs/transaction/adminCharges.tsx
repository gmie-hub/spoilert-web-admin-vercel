import { Button, HStack, Image, Stack } from "@chakra-ui/react";

import { NoData, SubHeader } from "@spt/components";
import { useAddAdminChargeStore } from "@spt/store/transaction";

const AdminCharges = () => {
  const setIsAdminCharge = useAddAdminChargeStore(
    (state) => state.setIsAddAdminCharge
  );

  const handleAddAdminCharge = () => setIsAdminCharge(true);

  return (
    <Stack>
      <HStack>
        <SubHeader>Admin Charges</SubHeader>
      </HStack>

      <NoData
        heading="You Haven’t Set Any Admin Charges Yet!"
        description="Set up commission rules based on spoil cost to automatically deduct fees from transactions. "
      >
        <Button variant="yellow" onClick={handleAddAdminCharge}>
          <Image src="/add-circle.svg" alt="add" /> Add Admin Charge
        </Button>
      </NoData>
    </Stack>
  );
};

export default AdminCharges;