import type { FC } from "react";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";

import { BackButton } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { codeGeneratedData } from "@spt/utils/sponsorshipData";

interface ComponentProps {
  handleBack: () => void;
}

const SponsorshipBreakdownDetails: FC<ComponentProps> = ({ handleBack }) => {
  return (
    <Stack gap="5" mt="3">
      <Stack>
        <HStack justifyContent="flex-start">
          <BackButton handleNavigation={handleBack} />
        </HStack>

        <Text fontSize={{ md: "xl" }} fontWeight="medium">
          Sponsorship Breakdown Details
        </Text>
      </Stack>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay
            title="Spoil Title"
            value="Understanding Design Principles"
          />
          <InfoDisplay title="Name of Tutor" value="Ogunsola Omorinsola" />
          <InfoDisplay title="Amount" value="₦500,000" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Learner’s Sponsored" value="5" />
          <InfoDisplay title="Date Sponsored" value="12-02-2025" />
          <InfoDisplay title="Codes Used" value="2 of 5" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Status" status="Active" />
        </ProgressInfo>

        <Text fontSize="lg" fontWeight="semibold">
          Code Generated
        </Text>

        {codeGeneratedData.map((item, index) => (
          <ProgressInfo key={index}>
            <InfoDisplay title={"Code " + index + 1} value={item.code} />
            <InfoDisplay title="Used By" value={item.usedBy} />
            <InfoDisplay title="Date Used" value={item.dateUsed} />
            <InfoDisplay
              title="Status"
              status={item.status}
              icon={item.status === "Used" ? <Image src="/check.svg" /> : ""}
            />
          </ProgressInfo>
        ))}
      </Stack>
    </Stack>
  );
};

export default SponsorshipBreakdownDetails;
