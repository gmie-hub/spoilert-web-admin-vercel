import type { FC } from "react";

import { Box,  Flex, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { SpoilData } from "@spt/types/spoils";

interface ComponentProps {
  data?: SpoilData;
}

const PromotionOverview: FC<ComponentProps> = ({ data }) => {
  return (
    <Stack gap="4" mt="2">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box h="80px" w="80px">
          <Image src={data?.cover_image_url} alt="enrolled" w="inherit" />
        </Box>

        {/* <Modal variant="yellow" px="8" buttonText="View Certificate">
          <Dialog.Content>
            <Image src="/certificate.png" alt="certificate" />
          </Dialog.Content>
        </Modal> */}
      </Flex>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay title="Spoil Title" value={data?.title} />
          <InfoDisplay title="Name of Tutor" value={data?.category?.name} />
          <InfoDisplay title="Promotion Package" value={data?.institution} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Duration" value={data?.course_code} />
          <InfoDisplay title="Amount" value={data?.pricing} />
          <InfoDisplay title="Time Left" value={`N${data?.amount?.toString()}`} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Start Date" value="Scheduled" />
          <InfoDisplay title="End Date" value={data?.modules_no?.toString()} />
          <InfoDisplay title="Status" value={data?.lessons_no?.toString()} />
        </ProgressInfo>

      

      </Stack>
    </Stack>
  );
};

export default PromotionOverview;
