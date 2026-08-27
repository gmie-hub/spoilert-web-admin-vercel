import {
  Button,
  Dialog,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useDeleteUserMutation } from "@spt/hooks/api/useDeleteUserMutation";
import { useGetAllUserDetailsQuery } from "@spt/hooks/api/useGetUserDetailsQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import { useDeleteStore, useEditStore } from "@spt/store";
import { formatDate, formatDateTime } from "@spt/utils/dateTime";

import { buildFullName } from "./data";

const ViewSubAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);

  const { data, isLoading, isError, errorMessage } = useGetAllUserDetailsQuery(
    Number(id)
  );

  const { deleteUserHandler, isDeleteLoading } = useDeleteUserMutation(
    routes.main.subAdmins.home
  );

  if (isLoading) return <LoadingState />;
  if (isError || !data)
    return (
      <ErrorState error={errorMessage || "Failed to load sub-admin details."} />
    );

  const handleEdit = () => {
    setIsEdit(true);
    navigate(generatePath(routes.main.subAdmins.edit, { id: String(id) }));
  };

  const handleDelete = () => {
    if (id) deleteUserHandler(Number(id));
  };

  const fullName = buildFullName(data?.first_name, data?.last_name);

  return (
    <Stack gap="6">
      <Breadcrumb
        previousLink="Sub-Admins"
        currentLink="View Sub-Admin Details"
        previousHref={routes.main.subAdmins.home}
        showBackButton
      />

      <Card>
        <Stack gap="6">
          <Flex
            align={{ md: "center" }}
            justify="space-between"
            direction={{ base: "column", md: "row" }}
            rowGap="3"
          >
            <HStack gap="4">
              <Image
                src={data?.avatar || "/user-icon.svg"}
                alt={fullName}
                boxSize="56px"
                borderRadius="full"
                objectFit="cover"
              />

              <Heading size={{ base: "sm", md: "lg" }}>
                Sub-Admin Details
              </Heading>
            </HStack>

            <HStack gap="3">
              <Button variant="yellow" onClick={handleEdit} flex="1">
                <Image src="/edit.svg" alt="edit" />
                Edit Sub-Admin
              </Button>

              <Button
                variant="dangerOutline"
                onClick={() => setIsDeleteOpen(true)}
                flex="1"
              >
                <Image src="/trash.svg" alt="delete" />
                Delete Sub-Admin
              </Button>
            </HStack>
          </Flex>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
            <InfoDisplay title="Full Name" value={fullName || "N/A"} />
            <InfoDisplay title="Username" value={data?.username || "N/A"} />
            <InfoDisplay title="Email Address" value={data?.email || "N/A"} />
          </Grid>

          <Separator />

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
            <InfoDisplay
              title="Phone Number"
              value={data?.phone_number || "N/A"}
            />
            <InfoDisplay title="Role" value={data?.role || "N/A"} />
            <InfoDisplay
              title="Status"
              status={data?.is_active ? "Active" : "Inactive"}
            />
          </Grid>

          <Separator />

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap="6">
            <InfoDisplay
              title="Date Joined"
              value={formatDate(data?.created_at)}
            />
            <InfoDisplay
              title="Last Login"
              value={formatDateTime(data?.last_login)}
            />
            <InfoDisplay
              title="Email Verified"
              value={
                data?.email_verified_at
                  ? formatDate(data.email_verified_at)
                  : "Not verified"
              }
            />
          </Grid>
        </Stack>
      </Card>

      <Dialog.Root
        open={isDeleteOpen}
        onOpenChange={(details) => setIsDeleteOpen(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <DeleteModalContent
              text="Sub-Admin"
              handleClick={handleDelete}
              isLoading={isDeleteLoading}
              successMessage="Sub-admin deleted successfully!"
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default ViewSubAdmin;
