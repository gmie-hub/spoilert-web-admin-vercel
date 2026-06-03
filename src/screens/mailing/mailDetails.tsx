import { Box, Heading, Separator, Stack, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { routes } from "@spt/routes";
import type { MailDatum } from "@spt/types/mailing";
import { formatDate } from "@spt/utils/dateTime";

const MailDetails = () => {
  const { state } = useLocation();
  const data = (state as { mail?: MailDatum })?.mail;

  if (!data) {
    return <ErrorState error="No email selected. Please go back and select one." />;
  }

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Mailing"
        currentLink="View Email Details"
        previousHref={routes.main.mailing.home}
      />

      <Card>
        <Stack gap="6">
          <Heading size={{ base: "md", md: "lg" }}>Email Details</Heading>

          <ProgressInfo>
            <InfoDisplay title="Title" value={data?.title} />
            <InfoDisplay title="Subject" value={data?.subject} />
            <InfoDisplay title="Users" value={data?.users ?? "All Users"} />
          </ProgressInfo>

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
              Body
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>{data?.body}</Text>
            <Separator mt="4" />
          </Box>

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
              Date Sent
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }}>
              {formatDate(data?.created_at)}
            </Text>
          </Box>
        </Stack>
      </Card>
    </Stack>
  );
};

export default MailDetails;
