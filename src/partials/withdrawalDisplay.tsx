import type { FC, ReactNode } from "react";

import { Stack, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";

interface ComponentProps {
  title: string | number;
  value?: string | number;
  status?: string;
  md?: string;
  flex?: Record<string, string> | string;
  icon?: ReactNode;
}

const WithdrawalDisplay: FC<ComponentProps> = ({
  icon,
  title,
  status,
  value,
  flex = { base: "1", md: "0 0 25%" },
}) => {
  return (
    <Stack alignItems="flex-start" flex={flex}>
      <Text fontSize="xs" color="gray.100">
        {title}
      </Text>

      <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
        {value}
      </Text>

      {status && <Tag status={status} icon={icon} />}
    </Stack>
  );
};

export default WithdrawalDisplay;
