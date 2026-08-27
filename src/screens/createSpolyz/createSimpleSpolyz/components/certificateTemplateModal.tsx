import { type FC, useState } from "react";

import {
  Box,
  Dialog,
  Flex,
  Input,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlineSearch, HiX } from "react-icons/hi";

import { CertificateTemplatePreview } from "@spt/components";
import {
  type CertificateTemplate,
  getTemplateName,
  useGetCertificateTemplatesQuery,
} from "@spt/hooks/api/useGetCertificateTemplatesQuery";
import type { CertificateTemplateSelection } from "@spt/store/createSpolyzStore";

interface CertificateTemplateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTemplateId?: string | null;
  onSelect: (template: CertificateTemplateSelection) => void;
}

const matchesSearch = (
  template: CertificateTemplate,
  index: number,
  search: string,
) => {
  if (!search) return true;

  return [template.code, getTemplateName(template, index)]
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase()
    .includes(search);
};

const CertificateTemplateModal: FC<CertificateTemplateModalProps> = ({
  open,
  onOpenChange,
  selectedTemplateId,
  onSelect,
}) => {
  const [search, setSearch] = useState("");

  const { templates, isLoading, isError, errorMessage } =
    useGetCertificateTemplatesQuery({ enabled: open });

  const visibleTemplates = templates.filter((template, index) =>
    matchesSearch(template, index, search.trim().toLowerCase()),
  );

  const handleSelect = (template: CertificateTemplate, index: number) => {
    onSelect({
      id: String(template.id),
      code: template.code,
      name: getTemplateName(template, index),
      templateContent: template.template?.template_content ?? "",
      templateFileName: template.template?.certificate_template_name ?? null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange(d.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="cover"
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="900px" mx="4">
            <Dialog.Body p="6">
              <Stack gap="6">
                <Flex align="flex-start" justify="space-between" gap="3">
                  <Stack gap="1">
                    <Text fontSize="lg" fontWeight="semibold" color="dark">
                      Choose Your Certificate Template
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      Pick the certificate learners get when they complete this
                      Spoylz.
                    </Text>
                  </Stack>

                  <Box
                    as="button"
                    aria-label="Close"
                    color="gray.500"
                    flexShrink={0}
                    onClick={() => onOpenChange(false)}
                  >
                    <HiX size={20} />
                  </Box>
                </Flex>

                <Flex
                  align="center"
                  gap="3"
                  border="1px solid #EFEFEF"
                  borderRadius="xl"
                  bg="#FBFBFB"
                  px="4"
                >
                  <Box color="gray.100" flexShrink={0} display="flex">
                    <HiOutlineSearch size={18} />
                  </Box>

                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search template.."
                    border="none"
                    px="0"
                    _focus={{ outline: "none", boxShadow: "none" }}
                  />
                </Flex>

                {isLoading && (
                  <Text fontSize="sm" color="gray.500">
                    Loading certificate templates...
                  </Text>
                )}

                {isError && (
                  <Text fontSize="sm" color="red.500">
                    {errorMessage}
                  </Text>
                )}

                {!isLoading && !isError && visibleTemplates.length === 0 && (
                  <Box
                    border="1px dashed #E0E0E0"
                    borderRadius="xl"
                    bg="#FBFBFB"
                    py="10"
                    textAlign="center"
                  >
                    <Text fontSize="sm" color="gray.500">
                      No certificate template matched your search.
                    </Text>
                  </Box>
                )}

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
                  {visibleTemplates.map((template, index) => {
                    const name = getTemplateName(template, index);
                    const isSelected =
                      selectedTemplateId === String(template.id);

                    return (
                      <Stack
                        key={template.id}
                        as="button"
                        gap="0"
                        textAlign="left"
                        border="1px solid"
                        borderColor={isSelected ? "blue.100" : "#EFEFEF"}
                        borderRadius="xl"
                        bg="white"
                        overflow="hidden"
                        cursor="pointer"
                        transition="all 0.2s ease"
                        _hover={{ borderColor: "blue.100" }}
                        onClick={() => handleSelect(template, index)}
                      >
                        <Flex justify="center" bg="#F8FAFC" p="3">
                          <CertificateTemplatePreview
                            markup={template.template?.template_content ?? ""}
                            title={`${name} preview`}
                            scale={0.32}
                          />
                        </Flex>

                        <Flex
                          align="center"
                          justify="space-between"
                          gap="3"
                          borderTop="1px solid #EFEFEF"
                          px="4"
                          py="3"
                        >
                          <Text fontSize="sm" fontWeight="medium" truncate>
                            {name}
                          </Text>

                          <Text
                            fontSize="xs"
                            fontWeight="semibold"
                            color={isSelected ? "blue.100" : "gray.500"}
                            flexShrink={0}
                          >
                            {isSelected ? "In Use" : "Select"}
                          </Text>
                        </Flex>
                      </Stack>
                    );
                  })}
                </SimpleGrid>
              </Stack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CertificateTemplateModal;
