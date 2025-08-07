import type { FC } from "react";

import { Flex, Stack, useBreakpointValue } from "@chakra-ui/react";

import InfoDisplay from "./infoDisplay";

interface ComponentProps {
  items: Array<any>;
}

const ItemGrid: FC<ComponentProps> = ({ items }) => {
  const columns = useBreakpointValue({ base: 2, md: 3 });

  const groupedItems = [];

  for (let i = 0; i < items?.length; i += columns!)
    groupedItems?.push(items?.slice(i, i + columns!));

  return (
    <Stack>
        {groupedItems?.map((row, rowIndex) => (
            <Flex key={rowIndex}>
                {row?.map((item, colIndex) => (
                    <InfoDisplay key={colIndex} title={item.title} />
                ))}
            </Flex>
        ))}
    </Stack>
  );
};

export default ItemGrid;
