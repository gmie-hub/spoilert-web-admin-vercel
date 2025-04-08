import type { FC, PropsWithChildren } from "react";

import { Card } from "@chakra-ui/react";

interface CardProps extends PropsWithChildren {
  pt?: string;
  pb?: string
}

const CustomCard: FC<CardProps> = ({ pt="4", pb="5", children }) => {
  return (
    <Card.Root pt={pt} pb={pb} flex="1" borderRadius="lg" h="100%">
      <Card.Body py="0">{children}</Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
