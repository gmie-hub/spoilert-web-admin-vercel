import type { FC } from "react";

import { Field, Input, Text } from "@chakra-ui/react";
import { type FieldProps, Field as FormikField } from "formik";

interface ComponentProps {
  name: string;
  label: string;
  placeholder: string;
  hasAsterisk?: boolean;
    type?: string;   
}

const CustomInput: FC<ComponentProps> = ({
  hasAsterisk,
  name,
  label,
  placeholder,
  type,
}) => {
  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
          <Field.Label fontSize="md">
            {label} {hasAsterisk && <Text as="span" color="red">*</Text>}
          </Field.Label>

          <Input
            {...field}
             type={type} 
            bg="#FBFBFB"
            border="1px solid #EFEFEF"
            placeholder={placeholder}
            borderRadius="xl"
            // size="xl"
            h="48px"
            mt="1"
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

export default CustomInput;
