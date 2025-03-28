import type { FC } from "react";

import { Stack, Text } from "@chakra-ui/react";

import { Tag } from "@spt/components";

interface ComponentProps {
  title: string;
  value: string;
  status?: string;
}

const InfoDisplay: FC<ComponentProps> = ({ title, status, value }) => {
  return (
    <Stack alignItems="flex-start" w="100%" flex="1">
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
        {title}
      </Text>

      <Text fontSize={{ base: "md", md: "lg" }} textWrap="nowrap">
        {value}
      </Text>

      {status && <Tag status={status} />}
    </Stack>
  );
};

export default InfoDisplay;
