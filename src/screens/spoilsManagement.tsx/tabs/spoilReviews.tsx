import {
  Box,
  Flex,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Card } from "@spt/components";
import { spoilReviewData } from "@spt/utils/spoilData";

const duplicatedItems = Array.from({ length: 9 }, (_, index) => ({
  ...spoilReviewData,
  key: index,
}));

const duplicateStars = Array.from({ length: 4 }, (_, index) => ({
  key: index,
  src: "/star.svg",
}));

const SpoilReviews = () => {
  return (
    <Box>
      <Flex flexWrap="wrap" columnGap="4" rowGap="5">
        {duplicatedItems.map((item, index) => (
          <Box
            key={index}
            w={{ base: "100%", md: "50%", lg: "calc(33.33% - 0.75rem)" }}
          >
            <Card px="3" py="3">
              <Stack gap="4">
                <HStack>
                  <Image src="/review-img.svg" />

                  <Stack>
                    <Text>{item.name}</Text>
                    <HStack>
                      {duplicateStars.map((star) => (
                        <Image key={star.key} src={star.src} />
                      ))}
                      <Image src="/plain-star.svg" />
                    </HStack>
                  </Stack>
                </HStack>

                <Stack>
                  <Text color="gray.800" fontSize="sm">
                    {item.review}
                  </Text>

                  <HStack fontSize="sm">
                    <Text color="gray">{item.date}</Text>
                    <Separator
                      orientation="vertical"
                      h="full"
                      borderColor="#666869"
                    />
                    <Text color="gray">{item.time}</Text>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default SpoilReviews;
