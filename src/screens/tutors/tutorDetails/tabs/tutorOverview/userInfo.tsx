import type { FC } from "react";

import { Box, Image, Separator, Stack } from "@chakra-ui/react";

import { Card } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import InfoDisplayWrapper from "@spt/partials/infoDisplayWrapper";
import type { UserDatum } from "@spt/types/user";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  data: UserDatum;
}
const UserInfo: FC<ComponentProps> = ({ data }) => {
  return (
    <Card>
      <Stack gap="6">
        <Box>
          <Image src="/user-icon.svg" alt="user" boxSize="14" />
        </Box>

        <InfoDisplayWrapper>
          <InfoDisplay
            flex="1"
            title="Name"
            value={`${data?.first_name}  ${data?.last_name} `}
          />
          <InfoDisplay flex="1" title="Username" value={data?.username} />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplayWrapper>
          <InfoDisplay flex="1" title="Email Address" value={data?.email} />
          <InfoDisplay
            flex="1"
            title="Phone Number"
            value={data?.phone_number}
          />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplayWrapper>
          <InfoDisplay
            flex="1"
            title="Expertise"
            value={data?.profile?.expertise?.join(", ")}
          />
          <InfoDisplay
            flex="1"
            title="Date Joined"
            value={formatDate(data?.created_at)}
          />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplay title="Bio" value={data?.profile?.bio} />
      </Stack>
    </Card>
  );
};

export default UserInfo;
