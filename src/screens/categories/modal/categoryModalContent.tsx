import type { FC } from "react";

import { Button, Dialog, HStack, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { object } from "yup";

import { Input, Modal, Textarea } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useCategoryMutation } from "@spt/hooks/api/useCreateCategoryMutation";
import { useModalStore, useSuccessStore } from "@spt/store";
import { validations } from "@spt/utils/validations";

interface ComponentProps {
  title: string;
  buttonText: string;
}

const CategoryModalContent: FC<ComponentProps> = ({ buttonText, title }) => {
  const { id } = useParams();

  const { isLoading, createCategoryHandler } = useCategoryMutation(Number(id));

  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const handleSuccessDone = () => {
    setOpenModal(false);
    setOpenSuccess(false);
  };

  const validationSchema = object().shape({
    categoryName: validations.name,
  });

  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Formik
          initialValues={{
            name: "",
            // image: "",
          }}
          onSubmit={(values) => {
            createCategoryHandler(values);
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

                <Textarea
                  name="description"
                  label="Category Description"
                  placeholder="Enter category description"
                />

                <HStack w="full" gap="5" justifyContent="center" mt="3">
                  <Dialog.ActionTrigger asChild>
                    <Button variant="yellowOutline" w="50%">
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>

                  <Modal
                    buttonText={buttonText}
                    isLoading={isLoading}
                    variant="yellow"
                    type="submit"
                    open={openSuccess}
                  >
                    <Dialog.Content>
                      <Dialog.Body>
                        <SuccessModalContent
                          heading="Category Updated Successfully"
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
