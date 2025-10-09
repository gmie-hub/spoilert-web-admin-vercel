import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import { useModalStore } from "@spt/store";

import CertificateFeeModalContent from "../../modal/certificateFeeModal";

const CertificateFee = () => {
  const openModal = useModalStore((state) => state.openModal);
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const hasCertFee = true;

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
            {hasCertFee ? "₦500" : "Not Set"}
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
            <CertificateFeeModalContent />
          </Modal>
        </Box>
      </Flex>
    </Box>
  );
};

export default CertificateFee;