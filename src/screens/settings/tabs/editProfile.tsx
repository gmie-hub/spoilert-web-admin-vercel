import React, { useRef, useState } from "react";

import { Box, Button, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { Input, SubHeader } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useEditProfileMutation } from "@spt/hooks/api/editProfileMutation";
import { useUserDetailsQuery } from "@spt/hooks/api/useGetUserByIdQuery";
import { useEditStore } from "@spt/store";
import { useAuthStore } from "@spt/store/useAuthStore";
import { validations } from "@spt/utils/validations";

const EditProfile = () => {
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const handleCancel = () => setIsEdit(false);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null); // ✅ for file format validation
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);

  const { userData, userLoading, userIsError, userErrorMessage } =
    useUserDetailsQuery(Number(user?.id));

  const { isEditLoading, editProfileHandler } = useEditProfileMutation(
    null,
    Number(user?.id),
    () => setIsEdit(false)
  );
  const initialValues = {
    firstName: userData?.first_name || "",
    middleName: userData?.middie_name || "",
    lastName: userData?.last_name || "",
    file: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: validations.firstName,
    lastName: validations.lastName,
    middleName: validations.middleName,
    file: Yup.mixed()
      .required("File is required")
      .test("fileType", "Only JPG files are allowed", (value: any) => {
        if (!value) return false;
        return ["image/jpeg", "image/jpg"].includes(value.type);
      }),
  });

  if (userLoading) return <LoadingState />;

  if (userIsError) return <ErrorState error={userErrorMessage} />;

  return (
    <Stack gap="6">
      <SubHeader>Edit profile</SubHeader>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values) => {
          editProfileHandler(values);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => {
          const handleImageClick = () => {
            setFileError(null); // reset previous errors
            fileInputRef.current?.click();
          };

          const handleFileChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const selectedFile = event.target.files?.[0];
            if (!selectedFile) return;

            // ✅ validate file format before preview
            if (!["image/jpeg", "image/jpg"].includes(selectedFile.type)) {
              setFileError("Only JPG files are allowed");
              setFieldValue("file", null);
              setPreview(null);
              return;
            }

            setFileError(null);
            setFieldValue("file", selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
          };

          const handleRemovePhoto = () => {
            setFieldValue("file", null);
            setPreview(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          };

          return (
            <Form onSubmit={handleSubmit}>
              {/* ✅ Profile Image Upload & Preview */}
              <Box
                display="flex"
                flexDirection="column"
                alignItems="start"
                justifyContent="center"
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />

                {/* Clickable Circle */}
                <Box
                  as="button"
                  borderRadius="full"
                  overflow="hidden"
                  h="80px"
                  w="80px"
                  onClick={(e) => {
                    e.preventDefault(); // ✅ prevent form submit when clicking the image
                    handleImageClick();
                  }}
                  cursor="pointer"
                  border="2px dashed #ddd"
                  _hover={{ opacity: 0.8 }}
                >
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Profile Preview"
                      objectFit="cover"
                      borderRadius="full"
                      overflow="hidden"
                      h="80px"
                      w="80px"
                    />
                  ) : (
                    <Image
                      src={userData?.avatar || "/user-icon.svg"}
                      alt="User Icon"
                      borderRadius="full"
                      overflow="hidden"
                      h="80px"
                      w="80px"
                    />
                  )}
                </Box>

                {preview && (
                  <Button
                    mt="2"
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    onClick={handleRemovePhoto}
                  >
                    Remove Photo
                  </Button>
                )}

                {/* ✅ File Validation Error */}
                {fileError ? (
                  <Text color="red.500" fontSize="sm" mt="2">
                    {fileError}
                  </Text>
                ) : (
                  touched.file &&
                  typeof errors.file === "string" && (
                    <Text color="red.500" fontSize="sm" mt="2">
                      {errors.file}
                    </Text>
                  )
                )}
              </Box>

              <Flex direction={{ base: "column", md: "row" }} gap="6" mt="4">
                <Input
                  name="firstName"
                  label="First Name"
                  placeholder="Enter First name"
                />
                <Input
                  name="middleName"
                  label="Middle Name"
                  placeholder="Enter Middle name"
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter Last name"
                />
              </Flex>

              <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent={{ md: "flex-end" }}
                gap={{ base: "3", md: "6" }}
                mt="6"
              >
                <Button
                  onClick={handleCancel}
                  variant="yellowOutline"
                  w={{ base: "full", md: "20%" }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isEditLoading}
                  variant="yellow"
                  w={{ base: "full", md: "20%" }}
                >
                  {isEditLoading ? "Loading..." : "Save Changes"}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

export default EditProfile;
