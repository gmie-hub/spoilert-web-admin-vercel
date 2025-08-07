import { Box, Dialog, HStack, Image, Text } from "@chakra-ui/react";

import Modal from "./modal";

const ImageModal = ({ url }: { url: string }) => {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      bg="#F8F8F8"
      ps="4"
      py="2"
      borderRadius="lg"
    >
      <HStack>
        <Image src={url} alt="idCard" h="40px" w="63px" />

        <Box>
          <Text fontSize="xs" fontWeight="medium">
            NIN.png
          </Text>

          <Text fontSize="10px" color="gray.400">
            3.5MB
          </Text>
        </Box>
      </HStack>

      <Modal
        variant="ghost"
        buttonIcon={<Image src="/maximize.svg" alt="arrow" />}
        px="0"
        py="0"
      >
        <Dialog.Content>
          <Image src={url} alt="nin" />
        </Dialog.Content>
      </Modal>
    </HStack>
  );
};

export default ImageModal;
