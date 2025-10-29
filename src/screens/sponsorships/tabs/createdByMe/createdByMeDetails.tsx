import type { FC } from "react";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";

import { BackButton } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { AdminSponsorshipsDatum } from "@spt/types/sponsorship";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  handleBack: () => void;
  data: AdminSponsorshipsDatum;
}

const CreatedByMeDetails: FC<ComponentProps> = ({ data, handleBack }) => {
  return (
    <Stack gap="5" mt="3">
      <Stack>
        <HStack justifyContent="flex-start">
          <BackButton handleNavigation={handleBack} />
        </HStack>

        <Text fontSize={{ md: "xl" }} fontWeight="medium">
          Sponsorship Created By Me Details
        </Text>
      </Stack>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay
            title="Name of Sponsor"
            value={`${data?.sponsor?.first_name} ${data?.sponsor?.last_name}`}
          />
          <InfoDisplay title="Spoil Title" value={data?.spoil?.title} />
          <InfoDisplay title="Name of Tutor" value="Adeyemi John" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Amount" value={`₦${data?.total_amount}`} />
          <InfoDisplay
            title="Learner’s Sponsored"
            value={data?.spoil?.enrolled_users}
          />
          <InfoDisplay
            title="Date Sponsored"
            value={formatDate(data?.created_at)}
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay flex="0 0 25%" title="Status" status={data?.status} />
          <InfoDisplay
            flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
            title="Codes Used"
            value={`${data?.total_redeemed} of ${data?.total_codes}`}
          />
        </ProgressInfo>

        <Text fontSize="lg" fontWeight="semibold">
          Code Generated
        </Text>

        {data?.codes?.map((item, index) => (
          <ProgressInfo key={index}>
            <InfoDisplay title={"Code " + index + 1} value={item.code} />
            <InfoDisplay
              title="Used By"
              value={`${item?.learner?.first_name ?? ""} ${item?.learner?.last_name ?? ""}`}
            />
            <InfoDisplay
              title="Date Used"
              value={formatDate(item?.redeemed_at)}
            />
            <InfoDisplay
              title="Status"
              status={item.status}
              icon={item.status === "redeemed" ? <Image src="/check.svg" /> : ""}
            />
          </ProgressInfo>
        ))}
      </Stack>
    </Stack>
  );
};

export default CreatedByMeDetails;
