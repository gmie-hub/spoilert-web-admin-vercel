import type { FC, PropsWithChildren } from "react";

import { Card } from "@chakra-ui/react";

const CustomCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card.Root pt="4" pb="5" flex="1" borderRadius="lg" h="100%">
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
