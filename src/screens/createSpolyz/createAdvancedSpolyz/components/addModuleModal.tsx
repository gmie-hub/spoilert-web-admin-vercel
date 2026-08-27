import { type FC } from "react";

import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { HiX } from "react-icons/hi";
import { object, string } from "yup";

import { Input, Textarea } from "@spt/components";

interface AddModuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: { title: string; description: string }) => void;
  initialValues?: { title: string; description: string };
  title?: string;
}

const AddModuleModal: FC<AddModuleModalProps> = ({
  open,
  onOpenChange,
  onSave,
  initialValues,
  title = "Add Module",
}) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange(d.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="md"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="520px" mx="4">
            <Stack gap="6" p="6">
              <Flex align="center" justify="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  {title}
                </Text>
                <IconButton
                  aria-label="Close"
                  variant="outline"
                  size="sm"
                  borderRadius="full"
                  borderColor="#E0E0E0"
                  onClick={() => onOpenChange(false)}
                >
                  <HiX size={16} />
                </IconButton>
              </Flex>

              <Formik
                initialValues={
                  initialValues ?? { title: "", description: "" }
                }
                validationSchema={object().shape({
                  title: string().required("Module title is required"),
                  description: string().required("Description is required"),
                })}
                enableReinitialize
                onSubmit={(values) => {
                  onSave(values);
                  onOpenChange(false);
                }}
              >
                {() => (
                  <Form>
                    <Stack gap="5">
                      <Input
                        name="title"
                        label="Module Title"
                        placeholder="Title"
                      />
                      <Textarea
                        name="description"
                        label="Description"
                        placeholder="Enter description for module"
                      />
                      <Button variant="yellow" type="submit" w="full">
                        Save
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddModuleModal;
