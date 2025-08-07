import { Box, HStack, Heading, Image, Stack } from "@chakra-ui/react";

import { Breadcrumb, Card, Modal } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";

import CategoryModalContent from "./modal/categoryModalContent";

const CategoryDetails = () => {
  return (
    <Stack>
      <Breadcrumb
        previousLink="Categories"
        currentLink="View Category Details"
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size={{ base: "sm", md: "lg" }}>Category Details</Heading>

            <HStack gap="3">
              <Modal
                buttonIcon={<Image src="/edit.svg" alt="edit" />}
                buttonText="Edit Category"
                variant="yellow"
                size="md"
              >
                <CategoryModalContent
                  title="Edit Category"
                  buttonText="Save Changes"
                />
              </Modal>

              <Modal
                buttonIcon={<Image src="/trash.svg" alt="delete" />}
                buttonText="Delete Account"
                variant="dangerOutline"
              >
                <DeleteModalContent text="Category" />
              </Modal>
            </HStack>
          </HStack>

          <Stack mt="5">
            <Stack gap="6">
              <Box>
                <Image src="/user-icon.svg" alt="user" boxSize="14" />
              </Box>

              <ProgressInfo>
                {firstDetails.map((item, index) => (
                  <InfoDisplay
                    title={item.title}
                    value={item.value}
                    key={index}
                  />
                ))}
              </ProgressInfo>

              <ProgressInfo>
                <InfoDisplay
                  title="Description"
                  value="This category is for all Institution spoils created on the app"
                />
              </ProgressInfo>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default CategoryDetails;

const firstDetails = [
  { title: "Category Name", value: "Institution Spoil" },
  { title: "No of Spoils", value: "10" },
  { title: "Date Created", value: "12-02-2025" },
];
