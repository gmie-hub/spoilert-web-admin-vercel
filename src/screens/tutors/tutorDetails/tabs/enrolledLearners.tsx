import type { FC } from "react";

import { Stack } from "@chakra-ui/react";

import { BackButton } from "@spt/components";

interface ComponentProps {
  handleBack: () => void;
}

const EnrolledLearners: FC<ComponentProps> = ({ handleBack }) => {
  return (
    <Stack>
      <BackButton handleNavigation={handleBack} />
    </Stack>
  );
};

export default EnrolledLearners;
