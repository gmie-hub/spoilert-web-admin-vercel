import type { FC, PropsWithChildren } from "react";

import { HStack, Tabs } from "@chakra-ui/react";

interface ComponentProps extends PropsWithChildren {
  tabList: Array<any>;
}

const CustomTabs: FC<ComponentProps> = ({ children, tabList }) => {
  return (
    <Tabs.Root defaultValue={tabList[0].value} colorPalette="yellow">
      <Tabs.List>
        <HStack gap="4">
          {tabList.map((item, index) => (
            <Tabs.Trigger
              key={index}
              value={item.value}
              _selected={{ color: "yellow" }}
            >
              {item.text}
            </Tabs.Trigger>
          ))}
        </HStack>
      </Tabs.List>

      {children}
    </Tabs.Root>
  );
};

export default CustomTabs;