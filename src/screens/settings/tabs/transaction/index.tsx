import { Separator, Stack } from "@chakra-ui/react";

import AdminCharges from "./adminCharges";
import CertificateFee from "./certificateFee";

const Transaction = () => {
  return (
    <Stack gap="4" mt="3">
      <CertificateFee />

      <Separator />

      <AdminCharges />
    </Stack>
  );
};

export default Transaction;
