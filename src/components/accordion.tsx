import type { FC, PropsWithChildren } from "react";

import { Accordion, type ConditionalValue } from "@chakra-ui/react";

interface ComponentProps extends PropsWithChildren {
  value: string;
  variant: ConditionalValue<"outline" | "subtle" | "enclosed" | "plain">;
}

const CustomAccordion: FC<ComponentProps> = ({ children, value, variant }) => {
  return (
    <Accordion.Root variant={variant}>
      <Accordion.Item value={value}>
        {children}
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default CustomAccordion;
