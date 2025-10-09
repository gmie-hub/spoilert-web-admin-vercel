import type { FC, PropsWithChildren } from "react";

import { HStack, Image, Stack, Text } from "@chakra-ui/react";

interface NoDataProps extends PropsWithChildren {
  heading: string;
  description: string;
}

const NoData: FC<NoDataProps> = ({ children, description, heading }) => {
  return (
    <HStack justifyContent="center" alignItems="center" w="100%" my="4">
      <Stack gap={{ base: "6", md: "10" }} textAlign="center" w={{ md: "35%" }}>
        <HStack justifyContent="center">
          <Image src="/empty.png" alt="empty" />
        </HStack>

        <Stack gap={{ md: "4" }}>
          <Text fontSize="xl" fontWeight="semibold">
            {heading}
          </Text>

          <Text color="gray">{description}</Text>
        </Stack>

        {children && children}
      </Stack>
    </HStack>
  );
};

export default NoData;
