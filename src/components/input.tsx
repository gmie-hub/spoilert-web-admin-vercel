  import { type FC, useState } from "react";

  import { Field, IconButton, Input, Text } from "@chakra-ui/react";
  import { type FieldProps, Field as FormikField } from "formik";
  import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

  import { InputGroup } from "./ui/input-group";

  interface ComponentProps {
    name: string;
    label: string;
    placeholder: string;
    hasAsterisk?: boolean;
      type?: string;
    /** Digits only, and no browser spinner arrows. */
    numeric?: boolean;
  }

  const CustomInput: FC<ComponentProps> = ({
    hasAsterisk,
    name,
    label,
    placeholder,
    type,
    numeric,
  }) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    // A password field keeps `type="password"` until the eye is clicked, then
    // renders as plain text so the value can be checked before submitting.
    const resolvedType = isPassword && showPassword ? "text" : type;

    return (
      <FormikField name={name}>
        {({ field, form }: FieldProps) => {
          const input = (
            <Input
              {...field}
              type={resolvedType}
              inputMode={numeric ? "numeric" : undefined}
              onChange={
                numeric
                  ? (event) =>
                      form.setFieldValue(
                        name,
                        event.target.value.replace(/[^0-9]/g, ""),
                      )
                  : field.onChange
              }
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
          );

          return (
            <Field.Root invalid={!!(form.touched[name] && form.errors[name])}>
              <Field.Label fontSize="md">
                {label} {hasAsterisk && <Text as="span" color="red">*</Text>}
              </Field.Label>

              {isPassword ? (
                <InputGroup
                  w="full"
                  endElement={
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      variant="ghost"
                      size="sm"
                      color="gray.100"
                      mt="1"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                    </IconButton>
                  }
                >
                  {input}
                </InputGroup>
              ) : (
                input
              )}

              {form.touched[name] && form.errors[name] && (
                <Field.ErrorText>{form.errors[name] as any}</Field.ErrorText>
              )}
            </Field.Root>
          );
        }}
      </FormikField>
    );
  };

  export default CustomInput;
