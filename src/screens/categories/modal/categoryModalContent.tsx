import type { FC } from "react";

import { Button, Dialog, HStack, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { Input, Modal, Textarea } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";

interface ComponentProps {
  title: string;
  buttonText: string;
}

const CategoryModalContent: FC<ComponentProps> = ({ buttonText, title }) => {
  return (
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
      </Dialog.Header>

      <Dialog.Body>
        <Formik initialValues={{}} onSubmit={() => {}}>
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
                    variant="yellow"

                    // size="md"
                  >
                    <Dialog.Content>
                      <Dialog.Body>
                        <SuccessModalContent heading="Category Updated Successfully" />
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
