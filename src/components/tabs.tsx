import type { FC, PropsWithChildren } from "react";

import { type ConditionalValue, Tabs } from "@chakra-ui/react";

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
      defaultValue={tabList[0]?.value}
      colorPalette="blue.100"
      variant={variant}
    >
      <Tabs.List
        bg={bg}
        rounded={rounded}
        p={p}
        w="100%"
        overflowX={{ base: "auto", md: "visible" }}
        overflowY="hidden"
      >
        {tabList?.map((item, index) => (
          <Tabs.Trigger
            key={index}
            value={item.value}
            flex="1"
            justifyContent="center"
            textAlign="center"
            _selected={{
              color: hasIndicator ? "white" : "blue.100",
              fontWeight: "semibold",
            }}
            whiteSpace={{ base: "normal", md: "nowrap" }}
            color="gray"
            fontSize={{ base: "xs", md: "sm", lg: "md" }}
            px={{ base: "2", md: "4" }}
            py={{ base: "2", md: "3" }}
            lineHeight="tight"
          >
            {item?.text}
          </Tabs.Trigger>
        ))}

        {hasIndicator && (
          <Tabs.Indicator rounded="20" bg="#013B4D" color="white" />
        )}
      </Tabs.List>

      {children}
    </Tabs.Root>
  );
};

export default CustomTabs;
