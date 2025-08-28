import type { FC, ReactNode } from "react";

import { Stack, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";

interface ComponentProps {
  title: string;
  value?: string;
  status?: string;
  md?: string;
  flex?: Record<string, string> | string;
  icon?: ReactNode;
}

const InfoDisplay: FC<ComponentProps> = ({
  icon,
  md = "md",
  title,
  status,
  value,
  flex = { base: "1", md: "0 0 25%" },
}) => {
  return (
    <Stack alignItems="flex-start" flex={flex}>
      <Text fontSize={{ base: "sm", md: md }} color="gray.100">
        {title}
      </Text>

      <Text fontSize={{ base: "md", md: "lg" }}>{value}</Text>

      {status && <Tag status={status} icon={icon} />}
    </Stack>
  );
};

export default InfoDisplay;
