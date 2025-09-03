import {
  Box,
  Flex,
  HStack,
  Image,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Card } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
// import LoadingState from "@spt/components/loadingState";
// import { usePagination } from "@spt/hooks/usePagination";
import { useGetAllSpoilReviewQuery } from "@spt/hooks/api/useGetAllSpoilReviewQuery";
import { formatDate, formatTime } from "@spt/utils/dateTime";

const SpoilReviews = () => {
  const { id } = useParams();

  
  const { data, isLoading, isError, reviewErrorMessage } =
    useGetAllSpoilReviewQuery(Number(id));

  // const visibleItems = data?.data?.slice(startRange, endRange);

  if (isError) <ErrorState error={reviewErrorMessage} />;
  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <Flex flexWrap="wrap" columnGap="4" rowGap="5">
        {data?.data?.map((item, index) => (
          <Box
            key={index}
            w={{ base: "100%", md: "50%", lg: "calc(33.33% - 0.75rem)" }}
          >
            <Card px="3" py="3">
              <Stack gap="4">
                <HStack>
                  <Image src="/review-img.svg" />

                  <Stack>
                    <Text>{item?.user?.first_name} {' '}{item?.user?.last_name}</Text>

                    <HStack>
                      {/* Filled stars */}
                      {Array.from({ length: item?.rating ?? 0 }).map(
                        (_, index) => (
                          <Image key={`filled-${index}`} src="/star.svg" />
                        )
                      )}

                      {/* Empty stars */}
                      {Array.from({ length: 5 - (item?.rating ?? 0) }).map(
                        (_, index) => (
                          <Image key={`empty-${index}`} src="/plain-star.svg" />
                        )
                      )}
                    </HStack>
                  </Stack>
                </HStack>

                <Stack>
                  <Text color="gray.800" fontSize="sm">
                    {item.comment}
                  </Text>

                  <HStack fontSize="sm">
                    <Text color="gray">{formatDate(item.created_at)}</Text>
                    <Separator
                      orientation="vertical"
                      h="full"
                      borderColor="#666869"
                    />
                    <Text color="gray">{formatTime(item.created_at)}</Text>
                  </HStack>
                </Stack>
              </Stack>
            </Card>
          </Box>
        ))}
      </Flex>

      {/* <Pagination
        page={page}
        pageSize={pageSize}
        items={data?.data}
        onPageChange={handlePageChange}
      /> */}
    </Box>
  );
};

export default SpoilReviews;
