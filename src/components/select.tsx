// import type { FC } from "react";

// import { Field, Portal, Select } from "@chakra-ui/react";
// import { type FieldProps, Field as FormikField } from "formik";

// type Option = {
//   value: string;
//   label: string;
// };

// interface ComponentProps {
//   name: string;
//   label: string;
//   placeholder: string;
//   options?: Option[];
// }

// const CustomSelect: FC<ComponentProps> = ({
//   options = [],
//   name,
//   label,
//   placeholder,
// }) => {
//   return (
//     <FormikField name={name}>
//       {({ field, form }: FieldProps) => (
//         <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
//           <Select.Root size="lg" {...field}>
//             <Select.HiddenSelect />
//             <Select.Label fontSize="md">{label}</Select.Label>

//             <Select.Control h="48px" mt="1">
//               <Select.Trigger borderRadius="lg" bg="#FBFBFB">
//                 <Select.ValueText placeholder={placeholder} />
//               </Select.Trigger>

//               <Select.IndicatorGroup>
//                 <Select.Indicator />
//               </Select.IndicatorGroup>
//             </Select.Control>

//             <Portal>
//               <Select.Positioner>
//                 <Select.Content>
//                   {options.map((item) => (
//                     <Select.Item value={item.value} key={item.value}>
//                       {item.label}
//                       <Select.ItemIndicator />
//                     </Select.Item>
//                   ))}
//                 </Select.Content>
//               </Select.Positioner>
//             </Portal>
//           </Select.Root>

//           {form.touched[name] && form.errors[name] && (
//             <Field.ErrorText>{form.errors[name] as any}</Field.ErrorText>
//           )}
//         </Field.Root>
//       )}
//     </FormikField>
//   );
// };

// export default CustomSelect;

import type { FC } from "react";

import { Field, Portal, Select, createListCollection } from "@chakra-ui/react";
import { type FieldProps, Field as FormikField } from "formik";

type Option = {
  value: string;
  label: string;
};

interface ComponentProps {
  name: string;
  label: string;
  placeholder: string;
  options?: Option[];
  /**
   * Render the menu inline instead of in a body-level portal. Required when
   * the select sits inside a Dialog: a portalled menu becomes a sibling of
   * the dialog, which Chakra marks inert and paints below the modal layer, so
   * the options never show. Inline keeps it in the dialog's own subtree.
   */
  portalled?: boolean;
}

const CustomSelect: FC<ComponentProps> = ({
  options = [],
  name,
  label,
  placeholder,
  portalled = true,
}) => {
  // ✅ create collection (REQUIRED in Chakra v3)
  const collection = createListCollection({
    items: options,
  });

  // z-index keeps the portalled menu above overlays; pointerEvents keeps it
  // clickable while a dialog disables them on the rest of the page.
  const menu = (
    <Select.Positioner zIndex={1500} pointerEvents="auto">
      <Select.Content>
        {collection.items.map((item) => (
          <Select.Item item={item} key={item.value}>
            {item.label}
            <Select.ItemIndicator />
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Positioner>
  );

  return (
    <FormikField name={name}>
      {({ field, form }: FieldProps) => (
        <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
          <Select.Root
            collection={collection}
            size="lg"
            value={field.value ? [field.value] : []}
            onValueChange={(e) => {
              form.setFieldValue(name, e.value[0]);
            }}
            onBlur={() => form.setFieldTouched(name, true)}
          >
            <Select.HiddenSelect />

            <Select.Label fontSize="md">{label}</Select.Label>

            <Select.Control h="48px" mt="1">
              <Select.Trigger borderRadius="lg" bg="#FBFBFB">
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>

              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>

            {portalled ? <Portal>{menu}</Portal> : menu}
          </Select.Root>

          {form.touched[name] && form.errors[name] && (
            <Field.ErrorText>
              {form.errors[name] as string}
            </Field.ErrorText>
          )}
        </Field.Root>
      )}
    </FormikField>
  );
};

export default CustomSelect;