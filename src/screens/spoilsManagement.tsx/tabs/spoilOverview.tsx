import type { FC } from "react";

import { Box, Dialog, Flex, Image, List, Stack, Text } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { SpoilData } from "@spt/types/spoils";
import { formatDate } from "@spt/utils/dateTime";

interface ComponentProps {
  data?: SpoilData;
}

const SpoilOverview: FC<ComponentProps> = ({ data }) => {
  return (
    <Stack gap="4" mt="2">
      <Flex
        flexDir={{ base: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box h="80px" w="80px">
          <Image src="/enrolled_spoils.png" alt="enrolled" w="inherit" />
        </Box>

        <Modal variant="yellow" px="8" buttonText="View Certificate">
          <Dialog.Content>
            <Image src="/certificate.png" alt="certificate" />
          </Dialog.Content>
        </Modal>
      </Flex>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay title="Spoil Title" value={data?.title} />
          <InfoDisplay title="Category" value={data?.category?.name} />
          <InfoDisplay title="Institution" value={data?.institution} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Course Code" value={data?.course_code} />
          <InfoDisplay title="Pricing" value={data?.pricing} />
          <InfoDisplay title="Amount" value={`N${data?.amount?.toString()}`} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Modules" value={data?.modules_no?.toString()} />
          <InfoDisplay title="Lessons" value={data?.lessons_no?.toString()} />
          <InfoDisplay
            title="Enrolled Learners"
            value={data?.enrolled_users?.toString()}
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            title="Date Created"
            value={formatDate(data?.created_at)}
          />
          <InfoDisplay
            title="Name of Tutor"
            value={`${data?.tutor?.first_name} ${data?.tutor?.last_name}`}
          />
          <InfoDisplay title="Status" status="Active" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ base: "0 0 25%", md: "0 0 25%" }}
            title="No of Likes"
            value={data?.likes_count?.toString()}
          />

          <InfoDisplay
            flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
            title="No of Shares"
            value={data?.shares_count?.toString()}
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ md: "0 0 100%" }}
            title="Description"
            value={data?.description}
          />
        </ProgressInfo>

        <Stack>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
            What they will learn
          </Text>

          <Box ms="6">
            <List.Root>
              <List.Item>
                {data?.what_to_tearn?.split(",").map((item, index) => (
                  <List.Item key={index} _marker={{ color: "#212529" }}>
                    {item}
                  </List.Item>
                ))}
              </List.Item>
            </List.Root>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SpoilOverview;
