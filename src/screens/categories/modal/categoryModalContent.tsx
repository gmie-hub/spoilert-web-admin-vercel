import type { FC } from "react";

import { Button, Dialog, HStack, Stack, useFileUpload } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { FileUpload, Input, Modal } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useCreateCategoryMutation } from "@spt/hooks/api/useCreateCategoryMutation";
import { useEditCategoryMutation } from "@spt/hooks/api/useEditCategoryMutation";
import { useEditStore, useModalStore, useSuccessStore } from "@spt/store";
import type { CategoryDatum } from "@spt/types/category";
import { validations } from "@spt/utils/validations";

interface ComponentProps {
  title: string;
  buttonText: string;
  data?: CategoryDatum;
}

const CategoryModalContent: FC<ComponentProps> = ({
  buttonText,
  title,
  data,
}) => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenModal = useModalStore((state) => state.setOpenModal);
  const isEdit = useEditStore((state) => state.isEdit);

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 300000,
  });

  const file = fileUpload.acceptedFiles[0];

  const { isLoading, createCategoryHandler } = useCreateCategoryMutation(file);
  const { isEditLoading, editCategoryHandler } = useEditCategoryMutation(
    file,
    data?.id
  );

  

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    setOpenModal(false);
  };

  const validationSchema = object().shape({
    categoryName: validations.name,
  });

  const initialValues = {
    categoryName: data?.name || "",
  };

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            isEdit
              ? editCategoryHandler(values)
              : createCategoryHandler(values);
          }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {() => (
            <Form>
              <Stack gap="8">
                <Input
                  name="categoryName"
                  label="Category Name"
                  placeholder="Enter category name"
                />

                {/* <Textarea
                  name="description"
                  label="Category Description"
                  placeholder="Enter category description"
                /> */}
                {(isEdit && file === undefined ) &&
                <img src={data?.url} alt={data?.url}  width={100} />}

                <FileUpload fileUpload={fileUpload} />

                <HStack w="full" gap="5" justifyContent="center" mt="3">
                  <Dialog.ActionTrigger asChild>
                    <Button variant="yellowOutline" w="50%">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>

                  <Modal
                    buttonText={buttonText}
                    isLoading={isEdit ? isEditLoading : isLoading}
                    variant="yellow"
                    type="submit"
                    open={openSuccess}
                  >
                    <Dialog.Content>
                      <Dialog.Body>
                        <SuccessModalContent
                          heading={`Category ${isEdit ? "Updated" : "Created"} Successfully`}
                          onClick={handleSuccessDone}
                        />
                      </Dialog.Body>
                    </Dialog.Content>
                  </Modal>
                </HStack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default CategoryModalContent;
