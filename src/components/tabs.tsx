import type { FC, PropsWithChildren } from "react";

import { HStack, Tabs } from "@chakra-ui/react";

interface ComponentProps extends PropsWithChildren {
  tabList: Array<any>;
}

const CustomTabs: FC<ComponentProps> = ({ children, tabList }) => {
  return (
    <Tabs.Root defaultValue={tabList[0].value} colorPalette="yellow">
      <Tabs.List overflow="hidden" w="100%">
        <HStack
          gap={{ base: "2", md: "4" }}
          justifyContent={{  mdDown: "flex-start" }}
          overflowX="auto"
          overflowY="hidden"
          w="100%"
        >
          {tabList.map((item, index) => (
            <Tabs.Trigger
              key={index}
              value={item.value}
              _selected={{ color: "yellow" }}
              textWrap="nowrap"
              color="gray"
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
