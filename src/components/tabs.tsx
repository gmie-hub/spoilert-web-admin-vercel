import type { FC, PropsWithChildren } from "react";

import { type ConditionalValue, HStack, Tabs } from "@chakra-ui/react";

interface ComponentProps extends PropsWithChildren {
  tabList: Array<any>;
  variant?: ConditionalValue<
    "outline" | "line" | "subtle" | "plain" | "enclosed"
  >;
  bg?: string;
  rounded?: string;
  p?: string;
  hasIndicator?: boolean;
  onValueChange?: (details: any) => void;
  value?: string;
}

const CustomTabs: FC<ComponentProps> = (props) => {
  const {
    bg,
    children,
    hasIndicator,
    onValueChange,
    p,
    rounded,
    tabList,
    value,
    variant,
  } = props;

  return (
    <Tabs.Root
      value={value}
      onValueChange={onValueChange}
      defaultValue={tabList[0].value}
      colorPalette="blue.100"
      variant={variant}
    >
      <Tabs.List bg={bg} rounded={rounded} p={p} overflow="hidden" w="100%">
        <HStack
          gap={{ base: "2", md: "4" }}
          justifyContent={{ mdDown: "flex-start" }}
          overflowX="auto"
          overflowY="hidden"
          w="100%"
        >
          {tabList.map((item, index) => (
            <Tabs.Trigger
              key={index}
              value={item.value}
              _selected={{
                color: hasIndicator ? "white" : "blue.100",
                fontWeight: "semibold",
              }}
              textWrap="nowrap"
              color="gray"
              fontSize="md"
            >
              {item.text}
            </Tabs.Trigger>
          ))}
        </HStack>

        {hasIndicator && (
          <Tabs.Indicator rounded="20" bg="#013B4D" color="white" />
        )}
      </Tabs.List>

      {children}
    </Tabs.Root>
  );
};

export default CustomTabs;
