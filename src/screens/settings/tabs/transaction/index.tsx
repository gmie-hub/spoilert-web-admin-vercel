import { Separator, Stack } from "@chakra-ui/react";

import { useSettingsQuery } from "@spt/hooks/api/useSettingsQuery";

import AdminCharges from "./adminCharges";
import CertificateFee from "./certificateFee";

const Transaction = () => {
  const { data } = useSettingsQuery();  

  return (
    <Stack gap="4" mt="3">
      <CertificateFee data={data?.data?.data} />

      <Separator />

      <AdminCharges data={data?.data?.data} />
    </Stack>
  );
};

export default Transaction;
