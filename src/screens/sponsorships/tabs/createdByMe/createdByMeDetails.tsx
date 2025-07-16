import type { FC } from "react";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";

import { BackButton } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { codeGeneratedData } from "@spt/utils/sponsorshipData";

interface ComponentProps {
  handleBack: () => void;
}

const CreatedByMeDetails: FC<ComponentProps> = ({ handleBack }) => {
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
          <InfoDisplay title="Name of Sponsor" value="Ogunsola Omorinsola" />
          <InfoDisplay
            title="Spoil Title"
            value="Understanding Design Principles"
          />
          <InfoDisplay title="Name of Tutor" value="Adeyemi John" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Amount" value="₦500,000" />
          <InfoDisplay title="Learner’s Sponsored" value="5" />
          <InfoDisplay title="Date Sponsored" value="12-02-2025" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay flex="0 0 25%" title="Status" status="Active" />
          <InfoDisplay flex={{ base: "0 0 50%", md: "0 0 62.5%"}} title="Codes Used" value="2 of 5" />
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

export default CreatedByMeDetails;
