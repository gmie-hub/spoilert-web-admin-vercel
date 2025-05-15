import type { FC, PropsWithChildren } from "react";

import { type BoxProps, Card } from "@chakra-ui/react";

interface CardProps extends PropsWithChildren, BoxProps {
  pt?: string;
  pb?: string
  px?: string;
}

const CustomCard: FC<CardProps> = ({ pt="4", pb="5", px="6", children, ...rest }) => {
  return (
    <Card.Root  pt={pt} pb={pb} flex="1" borderRadius="xl" h="100%" {...rest}>
      <Card.Body py="0" px={px}>{children}</Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
