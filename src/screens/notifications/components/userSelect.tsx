import { useState } from "react";

import { Box, Flex, Icon, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import { HiOutlineSearch } from "react-icons/hi";
import { HiChevronDown, HiChevronUp, HiXMark } from "react-icons/hi2";

import { Checkbox } from "@spt/components/ui/checkbox";
import { useGetNotificationUsersQuery } from "@spt/hooks/api/useGetNotificationUsersQuery";
import { useDebounce } from "@spt/hooks/useDebounce";
import type { UserDatum } from "@spt/types/user";

export interface NotificationFormValues {
  audiences: string[];
  user_ids: number[];
  title: string;
  type: string;
  body: string;
}

const audienceOptions = [
  { label: "All Users", value: "all_users" },
  { label: "All Tutors", value: "all_tutors" },
  { label: "All Learners", value: "all_learners" },
];

const getUserName = (user: UserDatum) =>
  `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
  user.username ||
  user.email;

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <Flex
    align="center"
    gap="2"
    bg="white"
    border="1px solid #EFEFEF"
    borderRadius="lg"
    px="2"
    py="1"
    maxW="160px"
  >
    <Text fontSize="sm" truncate>
      {label}
    </Text>
    <Icon
      as={HiXMark}
      boxSize="4"
      color="gray.100"
      cursor="pointer"
      flexShrink="0"
      _hover={{ color: "red" }}
      onClick={(e) => {
        e.stopPropagation();
        onRemove();
      }}
    />
  </Flex>
);

const UserSelect = () => {
  const { values, setFieldValue, errors, touched } =
    useFormikContext<NotificationFormValues>();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  // Remember names of selected users so chips render correctly even after the
  // search results (and therefore the visible user list) change.
  const [userNames, setUserNames] = useState<Record<number, string>>({});
  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading } = useGetNotificationUsersQuery(debouncedSearch);
  const users = data?.data ?? [];

  const toggleAudience = (value: string) => {
    const next = values.audiences.includes(value)
      ? values.audiences.filter((a) => a !== value)
      : [...values.audiences, value];
    setFieldValue("audiences", next);
  };

  const toggleUser = (user: UserDatum) => {
    const exists = values.user_ids.includes(user.id);
    const next = exists
      ? values.user_ids.filter((u) => u !== user.id)
      : [...values.user_ids, user.id];
    setFieldValue("user_ids", next);

    if (!exists) {
      setUserNames((prev) => ({ ...prev, [user.id]: getUserName(user) }));
    }
  };

  const removeAudience = (value: string) =>
    setFieldValue(
      "audiences",
      values.audiences.filter((a) => a !== value)
    );

  const removeUser = (id: number) =>
    setFieldValue(
      "user_ids",
      values.user_ids.filter((u) => u !== id)
    );

  const selectedCount = values.audiences.length + values.user_ids.length;
  const showError = !!(touched.audiences && errors.audiences);

  return (
    <Box>
      <Text fontSize="md" mb="1">
        Users
      </Text>

      {/* Trigger */}
      <Flex
        align="center"
        gap="2"
        bg="#FBFBFB"
        border="1px solid #EFEFEF"
        borderColor={showError ? "red" : "#EFEFEF"}
        borderRadius="xl"
        minH="48px"
        px="3"
        py="2"
        cursor="pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <Flex flex="1" wrap="wrap" gap="2" align="center">
          {selectedCount === 0 ? (
            <Text color="gray.100" fontSize="sm" px="1">
              Select users
            </Text>
          ) : (
            <>
              {audienceOptions
                .filter((a) => values.audiences.includes(a.value))
                .map((a) => (
                  <Chip
                    key={a.value}
                    label={a.label}
                    onRemove={() => removeAudience(a.value)}
                  />
                ))}

              {values.user_ids.map((id) => (
                <Chip
                  key={id}
                  label={userNames[id] ?? `User #${id}`}
                  onRemove={() => removeUser(id)}
                />
              ))}
            </>
          )}
        </Flex>

        <Icon
          as={open ? HiChevronUp : HiChevronDown}
          color="gray.100"
          flexShrink="0"
        />
      </Flex>

      {showError && (
        <Text color="red" fontSize="sm" mt="1">
          {errors.audiences as string}
        </Text>
      )}

      {/* Panel */}
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
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              border="none"
              px="0"
              _focus={{ boxShadow: "none" }}
            />
          </Flex>

          <Stack gap="4" py="2" maxH="320px" overflowY="auto">
            {audienceOptions.map((option) => (
              <Checkbox
                key={option.value}
                checked={values.audiences.includes(option.value)}
                onCheckedChange={() => toggleAudience(option.value)}
              >
                {option.label}
              </Checkbox>
            ))}

            {isLoading ? (
              <Flex align="center" gap="2" color="gray.100">
                <Spinner size="sm" /> <Text fontSize="sm">Loading users...</Text>
              </Flex>
            ) : users.length === 0 ? (
              <Text fontSize="sm" color="gray.100">
                No users found
              </Text>
            ) : (
              users.map((user) => (
                <Checkbox
                  key={user.id}
                  checked={values.user_ids.includes(user.id)}
                  onCheckedChange={() => toggleUser(user)}
                >
                  {getUserName(user)}
                </Checkbox>
              ))
            )}
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default UserSelect;
