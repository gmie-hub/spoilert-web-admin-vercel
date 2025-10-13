import type { FC } from "react";

import { Separator, Stack } from "@chakra-ui/react";

import type { Metadata2, Metadatum, SettingsDatum } from "@spt/types/settings";

import ContactInfo from "./contactInfo";
import SocialMediaLinks from "./socialMediaLinks";

interface GeneralProps {
  data: SettingsDatum[];
}

const General: FC<GeneralProps> = ({ data }) => {
  const GENERAL = "general";

  const filteredData = (data || []).filter((item) => item?.section === GENERAL);

  const socialMediaData = filteredData?.[0]?.metadata?.[0] as Metadatum;
  const contactInfoData = filteredData?.[1]?.metadata?.[0] as Metadata2;  

  return (
    <Stack>
      <ContactInfo
        contactInfoData={contactInfoData}
        id={filteredData?.[1]?.id}
      />

      <Separator />

      <SocialMediaLinks socialMediaData={socialMediaData} id={filteredData?.[0]?.id} />
    </Stack>
  );
};

export default General;