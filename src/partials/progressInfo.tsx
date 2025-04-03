import type { FC, PropsWithChildren } from "react";

import { Separator, Stack } from "@chakra-ui/react";

const ProgressInfo: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack gap="3">
      {children}
      <Separator />
    </Stack>
  );
};

export default ProgressInfo;
