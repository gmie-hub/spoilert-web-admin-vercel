import { type FC } from "react";

import { Button, Flex, Image, Text } from "@chakra-ui/react";

import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";

const CertificateSection: FC = () => {
  const draft = useCreateSpolyzStore((s) => s.simpleDraft);
  const setHasCertificate = useCreateSpolyzStore((s) => s.setHasCertificate);

  return (
    <Flex
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      gap="4"
      border="1px solid #EFEFEF"
      borderRadius="xl"
      bg="#FBFBFB"
      px="5"
      py="4"
    >
      <Flex align="center" gap="4" flex="1">
        <Flex
          align="center"
          justify="center"
          w="12"
          h="12"
          borderRadius="xl"
          bg="#EAF6FA"
          flexShrink={0}
        >
          <Image src="/award.svg" alt="" boxSize="6" />
        </Flex>

        <Text fontSize="sm" color="gray.600" maxW="520px">
          Give your learners a beautifully designed certificate when they
          complete this Spoylz
        </Text>
      </Flex>

      <Button
        variant={draft?.has_certificate ? "yellowOutline" : "yellow"}
        px="6"
        py="5"
        flexShrink={0}
        onClick={() => setHasCertificate(!draft?.has_certificate)}
      >
        {draft?.has_certificate ? "Certificate Selected" : "Choose Certificate"}
      </Button>
    </Flex>
  );
};

export default CertificateSection;
