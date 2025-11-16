import type { FC, PropsWithChildren } from "react";

import { type BoxProps, Card } from "@chakra-ui/react";

interface CardProps extends PropsWithChildren, BoxProps {
  pt?: string;
  pb?: string;
  px?: string;
  hasBoxShadow?: boolean;
}

const CustomCard: FC<CardProps> = ({
  pt = "4",
  pb = "5",
  px = "6",
  children,
  hasBoxShadow,
  ...rest
}) => {
  return (
    <Card.Root
      pt={pt}
      pb={pb}
      flex="1"
      borderRadius="xl"
      h="100%"
      boxShadow={hasBoxShadow ? "0px 4px 40px 0px #1E1E1E12" : ""}
      {...rest}
    >
      <Card.Body py="0" px={px}>
        {children}
      </Card.Body>
    </Card.Root>
  );
};

export default CustomCard;
