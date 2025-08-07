import { type FC } from "react";

import { Button, Dialog, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { object } from "yup";

import { Modal, Textarea } from "@spt/components";
import { useRejectKYCMutation } from "@spt/hooks/api/useRejectKYCMutation";
import { routes } from "@spt/routes";
import { useRejectionStore, useSuccessStore } from "@spt/store";
import { validations } from "@spt/utils/validations";

import SuccessModalContent from "./successModalContent";

export interface ComponentProps {
  heading: string;
  label: string;
  description: string;
  placeholder: string;
  buttonText: string;
  onClose: () => void;
  id: number;
}

const RejectModalContent: FC<ComponentProps> = ({
  buttonText,
  heading,
  description,
  label,
  placeholder,
  id,
}) => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const setOpenRejection = useRejectionStore((state) => state.setOpenRejection);
  const { isRejectLoading, rejectKYCHandler } = useRejectKYCMutation(id);
  const navigate = useNavigate();

  const handleSuccessDone = () => {
    setOpenRejection(false);
    setOpenSuccess(false);
    navigate(routes.main.pendingVerification.home);
  };

  const validationSchema = object().shape({
    reason: validations.reason,
  });

  return (
    <Dialog.Content borderRadius="xl" w="590px">
      <Dialog.Body>
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

          <Formik
            initialValues={{ reason: "" }}
            onSubmit={(values) => {
              rejectKYCHandler(values);
            }}
            validationSchema={validationSchema}
            enableReinitialize
          >
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
                        <Button variant="yellowOutline" flex="1">
                          Cancel
                        </Button>
                      </Dialog.ActionTrigger>

                      <Modal
                        type="submit"
                        variant="yellow"
                        isLoading={isRejectLoading}
                        buttonText={buttonText}
                        flex="1"
                        open={openSuccess}
                      >
                        <Dialog.Content>
                          <Dialog.Body>
                            <SuccessModalContent
                              heading="Verification Rejected Successfully"
                              onClick={handleSuccessDone}
                            />
                          </Dialog.Body>
                        </Dialog.Content>
                      </Modal>
                    </HStack>
                  </Stack>
                </Form>
              );
            }}
          </Formik>
        </Stack>
      </Dialog.Body>
    </Dialog.Content>
  );
};

export default RejectModalContent;