import { type FC } from "react";

import { Button, Flex, Image, Text } from "@chakra-ui/react";

import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";

const CertificateSection: FC = () => {
  const spolyzType = useCreateSpolyzStore((s) => s.spolyzType);
  const simpleDraft = useCreateSpolyzStore((s) => s.simpleDraft);
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setHasCertificate = useCreateSpolyzStore((s) => s.setHasCertificate);
  const setAdvancedHasCertificate = useCreateSpolyzStore(
    (s) => s.setAdvancedHasCertificate,
  );

  const isAdvanced = spolyzType === "advanced";
  const hasCertificate = isAdvanced
    ? advancedDraft?.has_certificate
    : simpleDraft?.has_certificate;

  // Only paid Spoylz can carry a certificate, so a free one can't select it.
  const pricing = isAdvanced ? advancedDraft?.pricing : simpleDraft?.pricing;
  const isPaid = Boolean(pricing && pricing !== "free");

  const toggleCertificate = () => {
    if (isAdvanced) {
      setAdvancedHasCertificate(!advancedDraft?.has_certificate);
    } else {
      setHasCertificate(!simpleDraft?.has_certificate);
    }
  };

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
          {isPaid
            ? "Give your learners a beautifully designed certificate when they complete this Spoylz"
            : "Certificates are only available on paid Spoylz. Set a price to add one."}
        </Text>
      </Flex>

      <Button
        variant={hasCertificate ? "yellowOutline" : "yellow"}
        px="6"
        py="5"
        flexShrink={0}
        disabled={!isPaid}
        onClick={toggleCertificate}
      >
        {hasCertificate ? "Certificate Selected" : "Choose Certificate"}
      </Button>
    </Flex>
  );
};

export default CertificateSection;
