import type { FC } from "react";

import { Button, Dialog, HStack, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useParams } from "react-router-dom";
import { object } from "yup";

import { Input, Modal, Textarea } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useCategoryMutation } from "@spt/hooks/api/useCreateCategoryMutation";
import { nameValidations } from "@spt/utils/validations";

interface ComponentProps {
  title: string;
  buttonText: string;
}

const CategoryModalContent: FC<ComponentProps> = ({ buttonText, title }) => {
  const { id } = useParams();

  const { isLoading, createCategoryHandler } = useCategoryMutation(Number(id));

  const validationSchema = object().shape({
    reason: nameValidations.name,
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
            image: "",
          }}
          onSubmit={(values) => {
            createCategoryHandler({
              name: values.name,
              image: values.image,
            });
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

                  <Modal buttonText={buttonText} isLoading={isLoading} variant="yellow">
                    <Dialog.Content>
                      <Dialog.Body>
                        <SuccessModalContent   heading="Category Updated Successfully" />
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
