import type { FC } from "react";

import { Stack, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";

interface ComponentProps {
  title: string;
  value?: string;
  status?: string;
  md?: string;
  flex?: Record<string, string>;
}

const InfoDisplay: FC<ComponentProps> = ({
  md = "md",
  title,
  status,
  value,
  flex = { base: "0 0 50%", md: "0 0 25%" },
}) => {
  return (
    <Stack alignItems="flex-start" flex={flex}>
      <Text fontSize={{ base: "sm", md: md }} color="gray.100">
        {title}
      </Text>

      <Text fontSize={{ base: "md", md: "lg" }}>{value}</Text>

      {status && <Tag status={status} />}
    </Stack>
  );
};

export default InfoDisplay;
