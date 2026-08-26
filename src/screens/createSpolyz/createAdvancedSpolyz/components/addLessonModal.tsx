import { type FC, useEffect, useRef, useState } from "react";

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
import { mixed, object, string } from "yup";

import { Editor, Input, Select, isEmptyHtml } from "@spt/components";
import type { LessonType } from "@spt/store/createSpolyzStore";

import LessonFileUpload from "./lessonFileUpload";

const lessonTypeOptions: { value: LessonType; label: string }[] = [
  { value: "text", label: "Text" },
  { value: "file", label: "File" },
];

export interface AddLessonFormValues {
  title: string;
  type: LessonType | "";
  content: string;
}

export interface AddLessonSaveValues {
  title: string;
  type: LessonType;
  content: string;
  content_file: File | null;
}

interface AddLessonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: AddLessonSaveValues) => void;
  initialValues?: AddLessonFormValues & { content_file?: File | null };
  title?: string;
}

const emptyValues: AddLessonFormValues = {
  title: "",
  type: "",
  content: "",
};

const AddLessonFormBody: FC<{
  values: AddLessonFormValues;
  setFieldValue: (field: string, value: string) => void;
  contentFile: File | null;
  fileError?: string;
  onFileChange: (file: File | null) => void;
  onTypeChange: () => void;
}> = ({
  values,
  contentFile,
  fileError,
  onFileChange,
  onTypeChange,
}) => {
  const previousTypeRef = useRef<LessonType | "">("");

  useEffect(() => {
    if (previousTypeRef.current && previousTypeRef.current !== values.type) {
      onTypeChange();
    }
    previousTypeRef.current = values.type;
  }, [values.type, onTypeChange]);

  return (
    <Form>
      <Stack gap="5">
        <Input
          name="title"
          label="Lesson Title"
          placeholder="What are design principles"
        />

        <Select
          name="type"
          label="Lesson Type"
          placeholder="Select lesson type"
          options={lessonTypeOptions}
          portalled={false}
        />

        {values.type === "text" && (
          <Editor
            name="content"
            label="Content"
            placeholder="Write lesson content"
            minH="200px"
          />
        )}

        {values.type === "file" && (
          <LessonFileUpload
            file={contentFile}
            onChange={onFileChange}
            error={fileError}
          />
        )}

        <Button variant="yellow" type="submit" w="full">
          Save
        </Button>
      </Stack>
    </Form>
  );
};

const AddLessonModal: FC<AddLessonModalProps> = ({
  open,
  onOpenChange,
  onSave,
  initialValues,
  title = "Add Lesson",
}) => {
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setContentFile(initialValues?.content_file ?? null);
      setFileError(undefined);
    }
  }, [open, initialValues?.content_file]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(d) => onOpenChange(d.open)}
      placement="center"
      motionPreset="slide-in-bottom"
      size="lg"
    >
      <Portal>
        <Dialog.Backdrop bg="blackAlpha.400" backdropFilter="blur(2px)" />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="640px" mx="4" maxH="90vh" overflowY="auto">
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

              <Formik<AddLessonFormValues>
                key={open ? "open" : "closed"}
                initialValues={initialValues ?? emptyValues}
                validationSchema={object().shape({
                  title: string().trim().required("Lesson title is required"),
                  type: mixed<LessonType>()
                    .oneOf(["text", "file"], "Select Text or File")
                    .required("Lesson type is required"),
                  content: string().when("type", {
                    is: "text",
                    then: (schema) =>
                      schema.test(
                        "has-content",
                        "Content is required",
                        (value) => !isEmptyHtml(value),
                      ),
                    otherwise: (schema) => schema,
                  }),
                })}
                enableReinitialize
                onSubmit={(values) => {
                  if (values.type === "file" && !contentFile) {
                    setFileError("File is required");
                    return;
                  }

                  onSave({
                    title: values.title.trim(),
                    type: values.type as LessonType,
                    content: values.type === "text" ? values.content : "",
                    content_file: values.type === "file" ? contentFile : null,
                  });
                  onOpenChange(false);
                }}
              >
                {({ values, setFieldValue }) => (
                  <AddLessonFormBody
                    values={values}
                    setFieldValue={setFieldValue}
                    contentFile={contentFile}
                    fileError={fileError}
                    onFileChange={(file) => {
                      setContentFile(file);
                      setFileError(undefined);
                    }}
                    onTypeChange={() => {
                      setContentFile(null);
                      setFileError(undefined);
                      setFieldValue("content", "");
                    }}
                  />
                )}
              </Formik>
            </Stack>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AddLessonModal;
