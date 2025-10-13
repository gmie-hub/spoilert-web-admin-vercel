import type { FC } from "react";

import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import { useModalStore } from "@spt/store";
import type { SettingProps } from "@spt/types/settings";

import CertificateFeeModalContent from "../../modal/certificateFeeModal";


const CertificateFee: FC<SettingProps> = ({ data }) => {
  const openModal = useModalStore((state) => state.openModal);
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const TRANSACTION = "transaction";

  const filteredData = (data || []).filter(
    (item) => item?.section === TRANSACTION
  );
  const certificateFeeData = filteredData?.[0];

  const hasCertFee =
    !!certificateFeeData && Object.keys(certificateFeeData).length > 0;

  const buttonIcon = hasCertFee ? "/edit.svg" : "/award.svg";

  return (
    <Box border="1px solid #EFEFEF" borderRadius="xl" p="4">
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack>
          <Text fontSize={{ base: "md", md: "lg" }} color="gray.100">
            Certificate Fee
          </Text>

          <Text fontSize={{ base: "md", md: "lg" }}>
            {hasCertFee ? certificateFeeData?.value : "Not Set"}
          </Text>
        </Stack>

        <Box>
          <Modal
            buttonIcon={<Image src={buttonIcon} alt="button" />}
            buttonText={`${hasCertFee ? "Edit" : "Set"} Certificate Fee`}
            variant="yellow"
            size="md"
            open={openModal}
            onOpenChange={(e) => setOpenModal(e.open)}
          >
            <CertificateFeeModalContent
              hasCertFee={hasCertFee}
              certFee={certificateFeeData?.value}
              id={certificateFeeData?.id}
            />
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export default CertificateFee;