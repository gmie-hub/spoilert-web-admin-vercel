import type { FC, PropsWithChildren } from "react";

import { Text } from "@chakra-ui/react";

const SubHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Text fontWeight="medium" fontSize="lg">
      {children}
    </Text>
  );
};

export default SubHeader;