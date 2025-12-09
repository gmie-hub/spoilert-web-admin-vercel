import { Box, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";

const PromotionManagementOverview = () => {
  return (
    <Stack gap="4" mt="2">
      <Box h="80px" w="80px">
        <Image src="/spoil.svg" alt="enrolled" w="inherit" />
      </Box>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay title="Spoil Title" value="Understanding Design Principles" />
          <InfoDisplay title="Name of Tutor" value="Ogunsola Omorinsola" />
          <InfoDisplay title="Promotion Package" value="Basic" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Duration" value="7 days" />
          <InfoDisplay title="Amount" value="N20,000" />
          <InfoDisplay
            title="Time Left"
            value="5d:2h:10m:40s left"
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Start Date" value="12-10-2025" />
          <InfoDisplay title="End Date" value="12-10-2025" />
          <InfoDisplay title="Status" value="Active" />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default PromotionManagementOverview;
