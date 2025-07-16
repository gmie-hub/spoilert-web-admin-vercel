import type { FC } from "react";

import { Field, type ListCollection, Portal, Select } from "@chakra-ui/react";
import { type FieldProps, Field as FormikField } from "formik";

type Options = {
  value: string;
  label: string;
};

interface ComponentProps {
  name: string;
  label: string;
  placeholder: string;
  collection?: ListCollection<Options>;
}

const CustomSelect: FC<ComponentProps> = ({
  collection,
  name,
  label,
  placeholder,
}) => {
  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
          <Select.Root collection={collection} size="lg" {...field}>
            <Select.HiddenSelect />
            <Select.Label fontSize="md">{label}</Select.Label>

            <Select.Control h='48px' mt="1">
              <Select.Trigger borderRadius="lg" bg="#FBFBFB">
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>

              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {collection?.items?.map((item: Options) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          {form.touched[name] && form.errors[name] && (
            <Field.ErrorText>{form.errors[name] as any}</Field.ErrorText>
          )}
        </Field.Root>
      )}
    </FormikField>
  );
};

export default CustomSelect;
