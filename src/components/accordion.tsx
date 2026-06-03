import type { FC, PropsWithChildren } from "react";

import { Accordion, type ConditionalValue } from "@chakra-ui/react";

interface ComponentProps extends PropsWithChildren {
  value: string;
  variant: ConditionalValue<"outline" | "subtle" | "enclosed" | "plain">;
  /** When provided, the accordion is controlled (expanded when true). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsible?: boolean;
}

const CustomAccordion: FC<ComponentProps> = ({
  children,
  value,
  variant,
  open,
  onOpenChange,
  collapsible,
}) => {
  const isControlled = open !== undefined;

  return (
    <Accordion.Root
      variant={variant}
      collapsible={collapsible}
      value={isControlled ? (open ? [value] : []) : undefined}
      onValueChange={
        onOpenChange
          ? (details) => onOpenChange(details.value.includes(value))
          : undefined
      }
    >
      <Accordion.Item value={value}>{children}</Accordion.Item>
    </Accordion.Root>
  );
};

export default CustomAccordion;
