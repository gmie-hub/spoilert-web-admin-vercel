import type { FC, PropsWithChildren } from "react";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";

interface NoDataProps extends PropsWithChildren {
  heading: string;
  description: string;
}

const NoData: FC<NoDataProps> = ({ children, description, heading }) => {
  return (
    <HStack justifyContent="center" alignItems="center" w="100%" my="4">
      <Stack textAlign="center" w={{ md: "35%" }}>
        <HStack justifyContent="center">
          <Image src="/empty.png" alt="empty" />
        </HStack>

        <Text fontSize="xl" fontWeight="semibold">
          {heading}
        </Text>

        <Text color="gray">{description}</Text>

        {children && children}
      </Stack>
    </HStack>
  );
};

export default NoData;
