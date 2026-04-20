import { Heading, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import { useGetAdDetailsQuery } from "@spt/hooks/api/useGetAdDetailsQuery";

import AdsForm from "./form/adsForm";

const EditAd = () => {
  const { id } = useParams();
  console.log( id ,' id  id ')
  const { data: ad, isLoading, isError, adDetailsErrorMessage } = useGetAdDetailsQuery(Number(id));

  if (isLoading) return <LoadingState />;
  if (isError || !ad) return <div style={{ color: 'red' }}>{adDetailsErrorMessage || 'Failed to load ad details.'}</div>;

  // Map backend ad fields to form initial values
  const initialValues = {
    title: ad.title || "",
    url: ad.url || "",
    category_id: ad.category_id?.toString() || "",
    size: ad.size || "",
    start_date: ad.start_date || "",
    end_date: ad.end_date || "",
    status: ad.status || "enabled",
    image: null, // Image upload is handled separately
  };
  console.log("EditAd initialValues", initialValues);

  return (
    <Stack gap="5">
      <Breadcrumb previousLink="Ads" currentLink="Edit Ads" showBackButton />
      <Card>
        <Stack gap="6">
          <Heading>Edit Ads</Heading>
          <AdsForm initialValues={initialValues} />
        </Stack>
      </Card>
    </Stack>
  );
};

export default EditAd;
