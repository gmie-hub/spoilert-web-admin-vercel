import React, { type FC, useState } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";

import { Textarea } from "@spt/components";

import SuccessModalContent from "./successModalContent";

export interface ComponentProps {
  heading: string;
  label: string;
  description: string;
  placeholder: string;
  buttonText: string;
  onClose: () => void;
  // setIsBlocked: React.Dispatch<React.SetStateAction<boolean>>;
}

const RejectModalContent: FC<ComponentProps> = ({
  buttonText,
  heading,
  description,
  label,
  placeholder,
  onClose,
}) => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
        {!openSuccess && (
          <Stack gap="8" my="4">
            <HStack justifyContent="center">
              <Image src="/danger-triangle.svg" alt="danger" />
            </HStack>

            <Stack textAlign="center">
              <Text fontSize="lg" fontWeight="medium">
                Are You Sure You Want To {heading}?
              </Text>

              <Text color="gray">{description}</Text>
            </Stack>

            <Formik initialValues={{}} onSubmit={() => {}}>
              {() => {
                return (
                  <Form>
                    <Stack w="100%" gap="8">
                      <Textarea
                        name="reason"
                        label={`Reason For ${label}`}
                        placeholder={`Enter the reason why you’re ${placeholder}`}
                      />

                      <HStack w="full" gap="5" justifyContent="center">
                        <Dialog.ActionTrigger asChild>
                          <Button variant="yellowOutline" w="50%">
                            Cancel
                          </Button>
                        </Dialog.ActionTrigger>

                        <Button
                          variant="danger"
                          w="50%"
                          onClick={handleOpenSuccess}
                        >
                          {buttonText}
                        </Button>
                      </HStack>
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </Stack>
        )}

        {openSuccess && (
          <SuccessModalContent
            heading="Verification Has Been Successfully Rejected"
            onClick={onClose}
          />
        )}
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default RejectModalContent;
