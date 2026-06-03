import { Box, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import type { NotificationDatum } from "@spt/types/notification";
import { formatDate } from "@spt/utils/dateTime";

const NotificationDetails = () => {
  const { state } = useLocation();
  const data = (state as { notification?: NotificationDatum })?.notification;

  if (!data) {
    return <ErrorState error="No notification selected. Please go back and select one." />;
  }

  const users = data?.users ?? [];

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Notifications"
        currentLink="View Notification Details"
        previousHref={routes.main.notifications.home}
      />

      <Card>
        <Stack gap="6">
          <Heading size={{ base: "md", md: "lg" }}>Notification Details</Heading>

          <ProgressInfo>
            <InfoDisplay title="Title" value={data?.title} />
            <InfoDisplay title="Type" value={data?.type} />
            <InfoDisplay
              title="Date Sent"
              value={formatDate(data?.created_at)}
            />
          </ProgressInfo>

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
              Body
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>{data?.body}</Text>
            <Separator mt="4" />
          </Box>

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="3">
              Users
            </Text>

            {users.length === 0 ? (
              <Text color="gray">No recipients</Text>
            ) : (
              <Stack gap="3">
                {users.map((user) => (
                  <Text key={user?.id} fontSize={{ base: "md", md: "lg" }}>
                    {`${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()}
                  </Text>
                ))}
              </Stack>
            )}

            <Separator mt="4" />
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
};

export default NotificationDetails;
