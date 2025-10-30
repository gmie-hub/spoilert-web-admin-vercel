import { useMemo } from "react";

import {
  Button,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { object } from "yup";

import { Breadcrumb, Card, Input, Select } from "@spt/components";
import { useCreateAdminSponsorMutation } from "@spt/hooks/api/useCreateAdminSponsorMutation";
import { useGetAllSpoilQuery } from "@spt/hooks/api/useGetAllSpoilQuery";
import { validations } from "@spt/utils/validations";

import { AutoFillTutor } from "./autoFillTutor";

const SponsorshipASpoil = () => {
  const { data, isLoading, isError, errorMessage } = useGetAllSpoilQuery();
  const { isCreateSponsorshipLoading, createAdminSponsorHandler } =
    useCreateAdminSponsorMutation();

  const spoilTitleCollection = useMemo(() => {
    if (isLoading) {
      return createListCollection({
        items: [{ value: "", label: "Loading..." }],
      });
    }

    if (isError) {
      return createListCollection({
        items: [{ value: "", label: errorMessage ?? "An error occurred" }],
      });
    }

    return createListCollection({
      items:
        data?.data?.map((spoil) => ({
          value: String(spoil.id),
          label: spoil.title,
        })) ?? [],
    });
  }, [data, isLoading, isError, errorMessage]);

  const initialValues = {
    nameOfSponsor: "",
    spoilTitle: "",
    tutorName: "",
    sponsoredLearners: "",
    amount: "",
  };

  const validationSchema = object().shape({
    nameOfSponsor: validations.nameOfSponsor,
    spoilTitle: validations.spoilTitle,
    tutorName: validations.tutorName,
    sponsoredLearners: validations.sponsoredLearners,
    amount: validations.amount,
  });

  return (
    <Stack gap="4">
      <Breadcrumb previousLink="Sponsorships" currentLink="Sponsor A Spoil" />

      <Card>
        <Stack gap="7">
          <Text fontSize="lg" fontWeight="semibold">
            Sponsor A Spoil
          </Text>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => createAdminSponsorHandler(values)}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {() => (
              <Form>
                <AutoFillTutor spoils={data?.data} />
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
                  <Input
                    name="sponsorEmail"
                    label="Email of Sponsor"
                    placeholder="Enter the email of the sponsor"
                  />
                  <Select
                    name="spoilTitle"
                    label="Spoil Title"
                    placeholder="Enter spoil"
                    collection={spoilTitleCollection}
                  />
                  <Input
                    name="tutorName"
                    label="Tutor's Name"
                    placeholder="Tutor's name"
                  />
                  <Input
                    name="sponsoredLearners"
                    label="Number of learners to sponsor"
                    placeholder="Enter number of learners"
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

                  <Button
                    type="submit"
                    w={{ md: "20%" }}
                    variant="yellow"
                    loading={isCreateSponsorshipLoading}
                  >
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
