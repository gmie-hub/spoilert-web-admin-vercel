import { Box, Image, Separator, Stack } from "@chakra-ui/react";

import { Card } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import InfoDisplayWrapper from "@spt/partials/infoDisplayWrapper";

const UserInfo = () => {
  return (
    <Card>
      <Stack gap="6">
        <Box>
          <Image src="/user-icon.svg" alt="user" boxSize="14" />
        </Box>

        <InfoDisplayWrapper>
          <InfoDisplay title="Name" value="Ogunsola Omorinsola" />
          <InfoDisplay title="Username" value="Omorinn" />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplayWrapper>
          <InfoDisplay title="Email Address" value="(+44)0123456" />
          <InfoDisplay title="Phone Number" value="Omorinn" />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplayWrapper>
          <InfoDisplay title="Expertise" value="UI/UX Designer" />
          <InfoDisplay title="Date Joined" value="12-02-2025" />
        </InfoDisplayWrapper>

        <Separator />

        <InfoDisplay
          title="Bio"
          value="I am a dedicated professional with a deep understanding of design principles and user-centered development.  With years of experience in design, I have helped students navigate the complexities of user interface (UI) and user experience (UX) design."
        />
      </Stack>
    </Card>
  );
};

export default UserInfo;
