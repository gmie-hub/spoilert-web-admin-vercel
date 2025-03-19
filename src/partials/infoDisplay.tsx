import type { FC } from "react";

import { Stack, Text } from "@chakra-ui/react";

interface ComponentProps {
  title: string;
  value: string;
}

const InfoDisplay: FC<ComponentProps> = ({ title, value }) => {
  return (
    <Stack>
      <Text fontSize="md" color="gray.100">
        {title}
      </Text>
      <Text fontSize="lg">{value}</Text>
    </Stack>
  );
};

export default InfoDisplay;
