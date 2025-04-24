import type { FC } from "react";

import { Field, Textarea } from "@chakra-ui/react";
import { type FieldProps, Field as FormikField } from "formik";

interface ComponentProps {
  name: string;
  label: string;
  placeholder: string;
}

const CustomTextarea: FC<ComponentProps> = ({ name, label, placeholder }) => {
  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
          <Field.Label fontSize="md">{label}</Field.Label>

          <Textarea
            {...field}
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            placeholder={placeholder}
            size="xl"
            borderRadius="xl"
            _placeholder={{
              fontSize: "sm",
              fontWeight: "normal",
              color: "gray.100",
            }}
          />

          {form.touched[name] && form.errors[name] && (
            <Field.ErrorText>{form.errors[name] as any}</Field.ErrorText>
          )}
        </Field.Root>
      )}
    </FormikField>
  );
};

export default CustomTextarea;
