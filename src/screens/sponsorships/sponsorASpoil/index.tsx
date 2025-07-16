import { Button, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card, Input, Select } from "@spt/components";
import { routes } from "@spt/routes";

const SponsorshipASpoil = () => {
  const navigate = useNavigate();

  const handleNavigation = () =>
    navigate(routes.main.sponsorships.sponsorshipCodes);

  return (
    <Stack gap="4">
      <Breadcrumb previousLink="Sponsorships" currentLink="Sponsor A Spoil" />

      <Card>
        <Stack gap="7">
          <Text fontSize="lg" fontWeight="semibold">
            Sponsor A Spoil
          </Text>

          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Form>
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  rowGap="8"
                  columnGap="6"
                >
                  <Input
                    name="nameOfSponsor"
                    label="Name of Sponsor"
                    placeholder="Enter the name of the sponsor"
                  />
                  <Select
                    name="spoilTitle"
                    label="Spoil Title"
                    placeholder="Enter spoil"
                  />
                  <Input
                    name="tutorName"
                    label="Tutor's Name"
                    placeholder="Tutor's name"
                  />
                  <Select
                    name="sponsoredLearners"
                    label="Number of learners to sponsor"
                    placeholder="Select number od learners"
                  />
                  <Input
                    name="amount"
                    label="Amount"
                    placeholder="Enter amount"
                  />
                </SimpleGrid>

                <HStack justifyContent="flex-end" mt="10" gap="6">
                  <Button w={{ md: "20%" }} variant="yellowOutline">
                    Cancel
                  </Button>

                  <Button w={{ md: "20%" }} variant="yellow" onClick={handleNavigation}>
                    Proceed
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SponsorshipASpoil;
