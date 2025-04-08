import type { FC, PropsWithChildren } from "react";

import { HStack } from "@chakra-ui/react";

const InfoDisplayWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HStack
      justifyContent="space-between"
      flexWrap="wrap"
      gap={{ mdDown: "6" }}
      w="100%"
    >
      {children}
    </HStack>
  );
};

export default InfoDisplayWrapper;
