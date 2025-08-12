import { Box, Dialog, Flex, Image, List, Stack, Text } from "@chakra-ui/react";

import { Modal } from "@spt/components";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { whatToLearnData } from "@spt/utils/spoilData";

const SpoilOverview = () => {
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
          <InfoDisplay
            title="Spoil Title"
            value="Understanding Design Principles"
          />
          <InfoDisplay title="Category" value="UI/UX Design" />
          <InfoDisplay title="University" value="University of Lagos" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Course Code" value="CHM 404" />
          <InfoDisplay title="Pricing" value="Paid" />
          <InfoDisplay title="Amount" value="N15,000" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Type" value="Scheduled" />
          <InfoDisplay
            title="Date And Time of Premiere"
            value="05-01-2025 | 10:20 am"
          />
          <InfoDisplay title="Modules" value="5" />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ base: "0 0 25%", md: "0 0 25%" }}
            title="Lessons"
            value="10"
          />
          <InfoDisplay
            flex={{ base: "0 0 50%", md: "0 0 62.5%" }}
            title="Date Created"
            value="12-02-2025"
          />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay
            flex={{ md: "0 0 100%" }}
            title="Description"
            value="This course is for aspiring product designers"
          />
        </ProgressInfo>

        <Stack>
          <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
            What they will learn
          </Text>

          <Box ms="6">
            <List.Root>
              <List.Item>
                {whatToLearnData.map((item, index) => (
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
