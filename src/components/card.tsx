import type { FC, PropsWithChildren } from "react";

import { Card } from "@chakra-ui/react";

const CustomCard: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card.Root px="5" pt="6" pb="5">
      <Card.Body>{children}</Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
