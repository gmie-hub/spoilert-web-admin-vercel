import { useEffect, useState } from "react";

import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { HiOutlineBookOpen, HiOutlineCollection } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { Card } from "@spt/components";
import { routes } from "@spt/routes";
import {
  type SpolyzType,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import SelectTutorModal from "./components/selectTutorModal";

const spolyzTypes = [
  {
    id: "simple" as const,
    title: "Simple Spolyz",
    description: "Create a Spoylz with single lessons",
    icon: HiOutlineBookOpen,
  },
  {
    id: "advanced" as const,
    title: "Advanced Spolyz",
    description: "Create a Spoylz with multiple lessons",
    icon: HiOutlineCollection,
  },
];

const CreateSpolyz = () => {
  const navigate = useNavigate();
  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);
  const setSelectedTutor = useCreateSpolyzStore((s) => s.setSelectedTutor);
  const setSpolyzType = useCreateSpolyzStore((s) => s.setSpolyzType);

  const [tutorModalOpen, setTutorModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<SpolyzType>("simple");

  useEffect(() => {
    if (!selectedTutor) {
      setTutorModalOpen(true);
    }
  }, [selectedTutor]);

  const handleContinue = () => {
    if (!selectedTutor) {
      setTutorModalOpen(true);
      return;
    }

    setSpolyzType(selectedType);

    navigate(
      selectedType === "simple"
        ? routes.main.createSpolyz.simple
        : routes.main.createSpolyz.advanced,
    );
  };

  return (
    <>
      <Stack gap="4">
        <Text fontSize="lg" fontWeight="semibold">
          Create Spolyz
        </Text>

        <Card>
          <Stack gap="8">
            <Stack gap="2">
              <Text fontSize="md" fontWeight="semibold">
                Choose Spolyz Type
              </Text>
              <Text fontSize="sm" color="gray.500" maxW="720px">
                Select the type of Spoylz you want to create. Choose the option
                that best fits how detailed you want your Spoylz to be.
              </Text>
            </Stack>

            <Flex
              direction={{ base: "column", md: "row" }}
              gap="4"
              align="stretch"
            >
              {spolyzTypes.map((type) => {
                const isSelected = selectedType === type.id;
                const Icon = type.icon;

                return (
                  <Box
                    key={type.id}
                    as="button"
                    flex="1"
                    textAlign="left"
                    border="1px solid"
                    borderColor={isSelected ? "blue.100" : "#EFEFEF"}
                    borderRadius="xl"
                    bg={isSelected ? "#EAF6FA" : "white"}
                    p="6"
                    cursor="pointer"
                    transition="all 0.2s ease"
                    _hover={{ borderColor: "blue.100" }}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <Stack gap="5">
                      <Flex
                        align="center"
                        justify="center"
                        w="14"
                        h="14"
                        borderRadius="full"
                        bg={isSelected ? "#D4EDF5" : "#F4F4F4"}
                        color={isSelected ? "blue.100" : "gray.500"}
                      >
                        <Icon size={24} />
                      </Flex>

                      <Stack gap="1">
                        <Text fontSize="md" fontWeight="semibold">
                          {type.title}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {type.description}
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                );
              })}
            </Flex>

            <Button variant="yellow" w="full" onClick={handleContinue}>
              Save And Continue
            </Button>
          </Stack>
        </Card>
      </Stack>

      <SelectTutorModal
        open={tutorModalOpen}
        onOpenChange={setTutorModalOpen}
        selectedTutor={selectedTutor}
        onContinue={setSelectedTutor}
      />
    </>
  );
};

export default CreateSpolyz;
