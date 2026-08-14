import { type FC, useState } from "react";

import { Box, Flex, Icon, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";

import { useGetTutorsQuery } from "@spt/hooks/api/useGetTutorsQuery";
import { useDebounce } from "@spt/hooks/useDebounce";
import type { UserDatum } from "@spt/types/user";

export const getTutorName = (tutor: UserDatum) =>
  `${tutor.first_name ?? ""} ${tutor.last_name ?? ""}`.trim() ||
  tutor.username ||
  tutor.email;

interface TutorSelectProps {
  value: UserDatum | null;
  onChange: (tutor: UserDatum) => void;
  showError?: boolean;
}

const TutorSelect: FC<TutorSelectProps> = ({ value, onChange, showError }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useGetTutorsQuery(debouncedSearch);
  const tutors = data?.data ?? [];

  const handleSelect = (tutor: UserDatum) => {
    onChange(tutor);
    setOpen(false);
    setSearch("");
  };

  return (
    <Box>
      <Text fontSize="md" mb="1">
        Tutor
      </Text>

      <Flex
        align="center"
        gap="2"
        bg="#FBFBFB"
        border="1px solid #EFEFEF"
        borderColor={showError ? "red.400" : "#EFEFEF"}
        borderRadius="xl"
        minH="48px"
        px="3"
        py="2"
        cursor="pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Text
          flex="1"
          fontSize="sm"
          color={value ? "dark" : "gray.100"}
          px="1"
          truncate
        >
          {value ? getTutorName(value) : "Select tutor"}
        </Text>

        <Icon
          as={open ? HiChevronUp : HiChevronDown}
          color="gray.100"
          flexShrink="0"
        />
      </Flex>

      {showError && (
        <Text color="red.400" fontSize="sm" mt="1">
          Please select a tutor
        </Text>
      )}

      {open && (
        <Stack gap="0" mt="3" px="1">
          <Flex
            align="center"
            gap="2"
            borderBottom="1px solid #EFEFEF"
            pb="3"
            mb="2"
          >
            <Icon as={HiOutlineSearch} color="gray.100" />
            <Input
              placeholder="Search tutors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              border="none"
              px="0"
              _focus={{ boxShadow: "none" }}
            />
          </Flex>

          <Stack gap="0" py="2" maxH="240px" overflowY="auto">
            {isLoading ? (
              <Flex align="center" gap="2" color="gray.100" py="2">
                <Spinner size="sm" />
                <Text fontSize="sm">Loading tutors...</Text>
              </Flex>
            ) : tutors.length === 0 ? (
              <Text fontSize="sm" color="gray.100" py="2">
                No tutors found
              </Text>
            ) : (
              tutors.map((tutor) => {
                const isSelected = value?.id === tutor.id;

                return (
                  <Flex
                    key={tutor.id}
                    align="center"
                    py="3"
                    px="2"
                    cursor="pointer"
                    borderRadius="lg"
                    bg={isSelected ? "#F0F7F8" : "transparent"}
                    _hover={{ bg: "#FAFAFA" }}
                    onClick={() => handleSelect(tutor)}
                  >
                    <Text fontSize="sm" color="dark">
                      {getTutorName(tutor)}
                    </Text>
                  </Flex>
                );
              })
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default TutorSelect;
