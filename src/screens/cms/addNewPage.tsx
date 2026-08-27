import { Button, Dialog, Flex, Heading, Portal, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import { Breadcrumb, Card, Editor, Input } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import SuccessModalContent from "@spt/components/successModalContent";
import { useCreateCmsMutation } from "@spt/hooks/api/useCreateCmsMutation";
import { useGetCmsDetailsQuery } from "@spt/hooks/api/useGetCmsDetailsQuery";
import { useUpdateCmsMutation } from "@spt/hooks/api/useUpdateCmsMutation";
import { routes } from "@spt/routes";
import { useSuccessStore } from "@spt/store";

interface CmsFormValues {
  title: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddNewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const { createCms, isLoading } = useCreateCmsMutation();
  const { updateCms, isUpdateLoading } = useUpdateCmsMutation();

  const {
    data: cmsData,
    isLoading: isDetailsLoading,
    isError,
    cmsDetailsErrorMessage,
  } = useGetCmsDetailsQuery(id ? Number(id) : 0);

  const isSaving = isEdit ? isUpdateLoading : isLoading;

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate(routes.main.cms.home);
  };

  if (isEdit && isDetailsLoading) return <LoadingState />;
  if (isEdit && isError) return <ErrorState error={cmsDetailsErrorMessage} />;

  const initialValues: CmsFormValues = {
    title: cmsData?.title ?? "",
    description: cmsData?.description ?? "",
  };

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="CMS Pages"
        currentLink={isEdit ? "Edit Page" : "Add Page"}
        previousHref={routes.main.cms.home}
        showBackButton
      />

      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values, { resetForm }) => {
            if (isEdit) {
              await updateCms({ ...values, id: Number(id) });
            } else {
              await createCms(values);
              resetForm();
            }
            setOpenSuccess(true);
          }}
        >
          <Form>
            <Stack gap="6">
              <Heading size={{ base: "md", md: "lg" }}>
                {isEdit ? "Edit Page" : "Add Page"}
              </Heading>

              <Input name="title" label="Title" placeholder="Title" />

              <Editor
                name="description"
                label="Description"
                placeholder="Write a description"
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
                  onClick={() => navigate(routes.main.cms.home)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="yellow"
                  w={{ base: "full", md: "150px" }}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save"}
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
                      ? "Page Updated Successfully"
                      : "Page Added Successfully"
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

export default AddNewPage;
