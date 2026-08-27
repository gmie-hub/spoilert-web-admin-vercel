import { type FC, useState } from "react";

import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { CertificateTemplatePreview } from "@spt/components";
import {
  type CertificateTemplateSelection,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import CertificateTemplateModal from "./certificateTemplateModal";

const CertificateSection: FC = () => {
  const spolyzType = useCreateSpolyzStore((s) => s.spolyzType);
  const simpleDraft = useCreateSpolyzStore((s) => s.simpleDraft);
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setHasCertificate = useCreateSpolyzStore((s) => s.setHasCertificate);
  const setAdvancedHasCertificate = useCreateSpolyzStore(
    (s) => s.setAdvancedHasCertificate,
  );
  const certificateTemplate = useCreateSpolyzStore(
    (s) => s.certificateTemplate,
  );
  const setCertificateTemplate = useCreateSpolyzStore(
    (s) => s.setCertificateTemplate,
  );

  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const isAdvanced = spolyzType === "advanced";
  const hasCertificate = isAdvanced
    ? advancedDraft?.has_certificate
    : simpleDraft?.has_certificate;

  // The draft flag and the picked template are sent as one thing at publish
  // time, so they always move together.
  const flagCertificate = (value: boolean) => {
    if (isAdvanced) {
      setAdvancedHasCertificate(value);
    } else {
      setHasCertificate(value);
    }
  };

  const handleSelect = (template: CertificateTemplateSelection) => {
    setCertificateTemplate(template);
    flagCertificate(true);
  };

  const handleRemove = () => {
    setCertificateTemplate(null);
    flagCertificate(false);
  };

  const selectedTemplate =
    hasCertificate && certificateTemplate?.templateContent
      ? certificateTemplate
      : null;

  return (
    <>
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
        <Flex align="center" gap="4" flex="1" minW="0">
          {selectedTemplate ? (
            <Box
              border="1px solid #EFEFEF"
              borderRadius="lg"
              overflow="hidden"
              flexShrink={0}
            >
              <CertificateTemplatePreview
                markup={selectedTemplate.templateContent}
                title={`${selectedTemplate.name} preview`}
                scale={0.12}
              />
            </Box>
          ) : (
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
          )}

          <Stack gap="1" minW="0">
            {selectedTemplate && (
              <Text fontSize="sm" fontWeight="semibold" color="dark" truncate>
                {selectedTemplate.name}
              </Text>
            )}

            <Text fontSize="sm" color="gray.600" maxW="520px">
              {selectedTemplate
                ? "This certificate is issued to learners who complete this Spoylz."
                : "Give your learners a beautifully designed certificate when they complete this Spoylz"}
            </Text>
          </Stack>
        </Flex>

        <Flex gap="3" flexShrink={0} wrap="wrap">
          {selectedTemplate && (
            <Button
              variant="ghost"
              color="red.500"
              px="4"
              py="5"
              onClick={handleRemove}
            >
              Remove
            </Button>
          )}

          <Button
            variant={selectedTemplate ? "yellowOutline" : "yellow"}
            px="6"
            py="5"
            onClick={() => setTemplateModalOpen(true)}
          >
            {selectedTemplate ? "Change Certificate" : "Choose Certificate"}
          </Button>
        </Flex>
      </Flex>

      <CertificateTemplateModal
        open={templateModalOpen}
        onOpenChange={setTemplateModalOpen}
        selectedTemplateId={selectedTemplate?.id ?? null}
        onSelect={handleSelect}
      />
    </>
  );
};

export default CertificateSection;
