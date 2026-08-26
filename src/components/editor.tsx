import { type FC, useEffect, useRef } from "react";

import { Box, Field, Flex, IconButton, Text } from "@chakra-ui/react";
import { useField } from "formik";
import {
  LuBold,
  LuHeading2,
  LuItalic,
  LuLink,
  LuList,
  LuListOrdered,
  LuUnderline,
} from "react-icons/lu";

interface ComponentProps {
  name: string;
  label: string;
  placeholder?: string;
  minH?: string;
}

const toolbar = [
  { icon: LuBold, label: "Bold", command: "bold" },
  { icon: LuItalic, label: "Italic", command: "italic" },
  { icon: LuUnderline, label: "Underline", command: "underline" },
  { icon: LuHeading2, label: "Heading", command: "formatBlock", value: "<h2>" },
  { icon: LuList, label: "Bulleted list", command: "insertUnorderedList" },
  { icon: LuListOrdered, label: "Numbered list", command: "insertOrderedList" },
  { icon: LuLink, label: "Link", command: "createLink" },
];

/**
 * Rich text editor backing an HTML form field (e.g. a CMS page body). The
 * value it writes to Formik is an HTML string, so render it back through
 * <RichText /> which sanitises before injecting.
 */
const Editor: FC<ComponentProps> = ({
  name,
  label,
  placeholder = "Start typing...",
  minH = "240px",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [field, meta, helpers] = useField<string>(name);

  // Push external value changes (edit mode loading its data, a reset) into the
  // editor. Comparing first keeps the caret still while the user types, since
  // their own keystrokes already round-trip through Formik.
  useEffect(() => {
    const element = editorRef.current;
    if (!element) return;

    const value = field.value ?? "";
    if (element.innerHTML !== value) {
      element.innerHTML = value;
    }
  }, [field.value]);

  const runCommand = (command: string, value?: string) => {
    editorRef.current?.focus();

    if (command === "createLink") {
      const url = window.prompt("Enter the link URL");
      if (!url) return;
      document.execCommand(command, false, url);
    } else {
      document.execCommand(command, false, value);
    }

    helpers.setValue(editorRef.current?.innerHTML ?? "");
  };

  const isInvalid = !!(meta.touched && meta.error);
  // A contentEditable left empty still holds stray markup like "<br>".
  const isEmpty = !field.value || field.value === "<br>" || field.value === "<p></p>";

  return (
    <Field.Root invalid={isInvalid}>
      <Field.Label fontSize="md">{label}</Field.Label>

      <Box
        w="100%"
        bg="#FBFBFB"
        border="1px solid"
        borderColor={isInvalid ? "red" : "#EFEFEF"}
        borderRadius="xl"
        mt="1"
        overflow="hidden"
      >
        <Flex
          gap="1"
          px="3"
          py="2"
          borderBottom="1px solid #EFEFEF"
          wrap="wrap"
        >
          {toolbar.map((item) => (
            <IconButton
              key={item.label}
              type="button"
              aria-label={item.label}
              title={item.label}
              variant="ghost"
              size="sm"
              // Keep the caret/selection in the editor when the button is hit.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runCommand(item.command, item.value)}
            >
              <item.icon />
            </IconButton>
          ))}
        </Flex>

        <Box position="relative">
          {isEmpty && (
            <Text
              position="absolute"
              top="3"
              left="4"
              fontSize="sm"
              color="gray.100"
              pointerEvents="none"
            >
              {placeholder}
            </Text>
          )}

          <Box
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role="textbox"
            aria-multiline="true"
            aria-label={label}
            minH={minH}
            px="4"
            py="3"
            outline="none"
            fontSize="md"
            onInput={(event) =>
              helpers.setValue((event.target as HTMLDivElement).innerHTML)
            }
            onBlur={() => helpers.setTouched(true)}
            css={{
              "& h2": { fontSize: "1.25rem", fontWeight: 600, margin: "0.5rem 0" },
              "& ul, & ol": { paddingInlineStart: "1.5rem" },
              "& a": { color: "#2563EB", textDecoration: "underline" },
            }}
          />
        </Box>
      </Box>

      {isInvalid && <Field.ErrorText>{meta.error}</Field.ErrorText>}
    </Field.Root>
  );
};

export default Editor;
