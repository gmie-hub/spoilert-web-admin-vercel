import {
  Button,
  Dialog,
  Flex,
  Heading,
  Portal,
  Stack,
  useFileUpload,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Breadcrumb, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import SuccessModalContent from "@spt/components/successModalContent";
import { useCreateAdminUserMutation } from "@spt/hooks/api/useCreateAdminUserMutation";
import { useGetAllUserDetailsQuery } from "@spt/hooks/api/useGetUserDetailsQuery";
import { useUpdateAdminUserMutation } from "@spt/hooks/api/useUpdateAdminUserMutation";
import { routes } from "@spt/routes";
import { useSuccessStore } from "@spt/store";

import SubAdminFields from "./components/subAdminFields";

interface SubAdminFormValues {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  // role: string;
  password: string;
}

const buildValidationSchema = (isEdit: boolean) => {
  // Editing an existing sub-admin leaves the password blank unless it is being
  // reset, so these rules only bite once something has actually been typed.
  const password = Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[0-9]/, "Password must contain a number")
    .matches(/[^A-Za-z0-9]/, "Password must contain a special character");

  return Yup.object().shape({
    first_name: Yup.string().trim().required("First name is required"),
    last_name: Yup.string().trim().required("Last name is required"),
    username: Yup.string()
      .trim()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters")
      // Spaces are the usual way a username gets rejected by the API, so catch
      // them here rather than on a round trip.
      .matches(
        /^[a-zA-Z0-9._-]+$/,
        "Username can only contain letters, numbers, dots, hyphens and underscores"
      ),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email address is required"),
    phone_number: Yup.string()
      .trim()
      .matches(/^[0-9+\-\s()]*$/, "Enter a valid phone number"),
    // role: Yup.string().required("Role is required"),
    password: isEdit ? password : password.required("Password is required"),
  });
};

const SubAdminForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const fileUpload = useFileUpload({ maxFiles: 1, maxFileSize: 2000000 });
  const avatar = fileUpload.acceptedFiles[0];

  const { createAdminUser, isLoading } = useCreateAdminUserMutation();
  const { updateAdminUser, isUpdateLoading } = useUpdateAdminUserMutation(
    Number(id)
  );

  const {
    data: subAdmin,
    isLoading: isDetailsLoading,
    isError,
    errorMessage,
  } = useGetAllUserDetailsQuery(isEdit ? Number(id) : 0);

  const isSaving = isEdit ? isUpdateLoading : isLoading;

  // Where Cancel's sibling crumb and the success modal go back to: the details
  // screen when editing, the list when creating.
  const previousHref = isEdit
    ? generatePath(routes.main.subAdmins.details, { id: String(id) })
    : routes.main.subAdmins.home;

  if (isEdit && isDetailsLoading) return <LoadingState />;
  if (isEdit && isError) return <ErrorState error={errorMessage} />;

  const initialValues: SubAdminFormValues = {
    first_name: (isEdit && subAdmin?.first_name) || "",
    last_name: (isEdit && subAdmin?.last_name) || "",
    username: (isEdit && subAdmin?.username) || "",
    email: (isEdit && subAdmin?.email) || "",
    phone_number: (isEdit && subAdmin?.phone_number) || "",
    // role: (isEdit && subAdmin?.role) || "",
    password: "",
  };

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate(previousHref);
  };

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink={isEdit ? "View Sub-Admin Details" : "Sub-Admins"}
        currentLink={isEdit ? "Edit Sub-Admin" : "Create Sub-Admin"}
        previousHref={previousHref}
        showBackButton
      />

      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={buildValidationSchema(isEdit)}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            const first_name = values.first_name.trim();
            const last_name = values.last_name.trim();

            const payload = {
              first_name,
              last_name,
              username: values.username.trim(),
              email: values.email.trim(),
              password: values.password,
              phone_number: values.phone_number.trim(),
              // role: values.role,
              avatar,
            };

            if (isEdit) {
              await updateAdminUser(payload);
            } else {
              await createAdminUser(payload);
              resetForm();
              fileUpload.clearFiles();
            }

            setOpenSuccess(true);
          }}
        >
          <Form>
            <Stack gap="6">
              <Heading size={{ base: "md", md: "lg" }}>
                {isEdit ? "Edit Sub-Admin" : "Create Sub-Admin"}
              </Heading>

              <SubAdminFields
                isEdit={isEdit}
                fileUpload={fileUpload}
                avatarUrl={subAdmin?.avatar}
                hasNewAvatar={!!avatar}
              />

              <Flex
                direction={{ base: "column", md: "row" }}
                gap="4"
                justify="flex-end"
                mt="2"
              >
                <Button
                  type="button"
                  variant="yellowOutline"
                  w={{ base: "full", md: "150px" }}
                  onClick={() => navigate(previousHref)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="yellow"
                  w={{ base: "full", md: "150px" }}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </Flex>
            </Stack>
          </Form>
        </Formik>
      </Card>

      <Dialog.Root
        open={openSuccess}
        onOpenChange={(details) => setOpenSuccess(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading={
                    isEdit
                      ? "Sub-Admin Updated Successfully"
                      : "Sub-Admin Created Successfully"
                  }
                  onClick={handleSuccessDone}
                />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default SubAdminForm;
