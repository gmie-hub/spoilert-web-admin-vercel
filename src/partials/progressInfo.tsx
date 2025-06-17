import type { FC, PropsWithChildren } from "react";

import { Flex, Separator, Stack } from "@chakra-ui/react";

const ProgressInfo: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack gap="2">
      <Flex
        justifyContent="space-between"
        rowGap="3"
        alignItems="flex-start"
        wrap="wrap"
      >
        {children}
      </Flex>

      <Separator />
    </Stack>
  );
};

export default ProgressInfo;
