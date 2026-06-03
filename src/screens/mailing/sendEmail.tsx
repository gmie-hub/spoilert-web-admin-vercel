import { Button, Dialog, Flex, Grid, Heading, Portal, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Breadcrumb, Card, Input, Textarea } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useSendEmailMutation } from "@spt/hooks/api/useSendEmailMutation";
import { routes } from "@spt/routes";
import { useSuccessStore } from "@spt/store";

import UserSelect from "../notifications/components/userSelect";

interface EmailFormValues {
  audiences: string[];
  user_ids: number[];
  title: string;
  subject: string;
  body: string;
}

const initialValues: EmailFormValues = {
  audiences: [],
  user_ids: [],
  title: "",
  subject: "",
  body: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  subject: Yup.string().required("Subject is required"),
  body: Yup.string().required("Message body is required"),
  audiences: Yup.array().test(
    "at-least-one-recipient",
    "Select at least one recipient",
    function () {
      const { audiences, user_ids } = this.parent as EmailFormValues;
      return (audiences?.length ?? 0) + (user_ids?.length ?? 0) > 0;
    }
  ),
});

const SendEmail = () => {
  const navigate = useNavigate();
  const { sendEmail, isLoading } = useSendEmailMutation();
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate(routes.main.mailing.home);
  };

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Mailing"
        currentLink="Send an Email"
        previousHref={routes.main.mailing.home}
        showBackButton
      />

      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const group = [...values.audiences];
            if (values.user_ids.length) group.push("userIds");

            await sendEmail({
              title: values.title,
              subject: values.subject,
              body: values.body,
              user_ids: values.user_ids,
              group,
            });
            resetForm();
            setOpenSuccess(true);
          }}
        >
          <Form>
            <Stack gap="6">
              <Heading size={{ base: "md", md: "lg" }}>Send an Email</Heading>

              <UserSelect />

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                <Input name="title" label="Title" placeholder="Title" />

                <Input
                  name="subject"
                  label="Subject"
                  placeholder="Enter the subject of your email"
                />
              </Grid>

              <Textarea
                name="body"
                label="Body"
                placeholder="Type in your message"
              />

              <Flex
                direction={{ base: "column", md: "row" }}
                gap="4"
                justify="flex-end"
                mt="2"
              >
                <Button
                  type="button"
                  variant="yellowOutline"
                  w={{ base: "full", md: "150px" }}
                  onClick={() => navigate(routes.main.mailing.home)}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="yellow"
                  w={{ base: "full", md: "150px" }}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </Flex>
            </Stack>
          </Form>
        </Formik>
      </Card>

      <Dialog.Root
        open={openSuccess}
        onOpenChange={(details) => setOpenSuccess(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading="Email Sent Successfully"
                  onClick={handleSuccessDone}
                />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default SendEmail;
