import type { FC } from "react";

import {
  Image,
  SimpleGrid,
  Stack,
  Text,
  type UseFileUploadReturn,
} from "@chakra-ui/react";
import { ErrorMessage, useFormikContext } from "formik";

import { FileUpload, Input } from "@spt/components";

interface ComponentProps {
  isEdit: boolean;
  fileUpload: UseFileUploadReturn;
  /** Currently stored avatar, shown until a replacement is picked. */
  avatarUrl?: string | null;
  hasNewAvatar: boolean;
}

const SubAdminFields: FC<ComponentProps> = ({
  isEdit,
  fileUpload,
  avatarUrl,
  hasNewAvatar,
}) => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <Input
          name="first_name"
          label="First Name"
          placeholder="Enter first name"
          hasAsterisk
        />

        <Input
          name="last_name"
          label="Last Name"
          placeholder="Enter last name"
          hasAsterisk
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <Input
          name="username"
          label="Username"
          placeholder="e.g. admin-user-2"
          hasAsterisk
        />

        <Input
          name="email"
          label="Email Address"
          placeholder="Enter email address"
          type="email"
          hasAsterisk
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <Input
          name="phone_number"
          label="Phone Number"
          placeholder="Enter phone number"
        />

        <Input
          name="password"
          label="Password"
          placeholder={isEdit ? "Leave blank to keep current" : "Enter password"}
          type="password"
          hasAsterisk={!isEdit}
        />
      </SimpleGrid>

      {/* The design has a Role select here, but `POST /admin/users` does not
          take a role — the endpoint assigns it. Restore this once the backend
          exposes role tiers, along with the `role` lines in subAdminForm.tsx.

      <Select
        name="role"
        label="Role"
        placeholder="Select role"
        options={subAdminRoleOptions}
      />
      */}

      <Stack gap="2">
        <Text fontSize="md">Profile Picture</Text>

        {isEdit && !hasNewAvatar && avatarUrl && (
          <Image
            src={avatarUrl}
            alt="Current profile picture"
            boxSize="64px"
            borderRadius="full"
            objectFit="cover"
          />
        )}

        <FileUpload
          fileUpload={fileUpload}
          onChange={() =>
            setFieldValue("avatar", fileUpload.acceptedFiles[0] || null)
          }
        />

        <ErrorMessage
          name="avatar"
          render={(msg) => (
            <Text color="red.500" fontSize="sm">
              {msg}
            </Text>
          )}
        />
      </Stack>
    </>
  );
};

export default SubAdminFields;
