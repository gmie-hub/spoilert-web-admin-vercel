import { Button, Dialog, Flex, Grid, Heading, Portal, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Breadcrumb, Card, Input, Select, Textarea } from "@spt/components";
import SuccessModalContent from "@spt/components/successModalContent";
import { useSendNotificationMutation } from "@spt/hooks/api/useSendNotificationMutation";
import { routes } from "@spt/routes";
import { useSuccessStore } from "@spt/store";

import UserSelect, { type NotificationFormValues } from "./components/userSelect";

const typeOptions = [
  { value: "push", label: "Push notification" },
  { value: "in_app", label: "In-App Notification" },
];

const initialValues: NotificationFormValues = {
  audiences: [],
  user_ids: [],
  title: "",
  type: "",
  body: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  type: Yup.string().required("Notification type is required"),
  body: Yup.string().required("Message body is required"),
  audiences: Yup.array().test(
    "at-least-one-recipient",
    "Select at least one recipient",
    function () {
      const { audiences, user_ids } = this.parent as NotificationFormValues;
      return (audiences?.length ?? 0) + (user_ids?.length ?? 0) > 0;
    }
  ),
});

const SendNotification = () => {
  const navigate = useNavigate();
  const { sendNotification, isLoading } = useSendNotificationMutation();
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate(routes.main.notifications.home);
  };

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Notifications"
        currentLink="Send Notification"
        previousHref={routes.main.notifications.home}
        showBackButton
      />

      <Card>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const group = [...values.audiences];
            if (values.user_ids.length) group.push("userIds");

            await sendNotification({
              title: values.title,
              body: values.body,
              type: values.type,
              user_ids: values.user_ids,
              group,
            });
            resetForm();
            setOpenSuccess(true);
          }}
        >
          <Form>
            <Stack gap="6">
              <Heading size={{ base: "md", md: "lg" }}>Send Notification</Heading>

              <UserSelect />

              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="6"
              >
                <Input
                  name="title"
                  label="Title"
                  placeholder="Title"
                />

                <Select
                  name="type"
                  label="Type"
                  placeholder="Select the type of notification"
                  options={typeOptions}
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
                  onClick={() => navigate(routes.main.notifications.home)}
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
                  heading="Notification Sent Successfully"
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

export default SendNotification;
