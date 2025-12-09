import {
  Button,
  Dialog,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Portal,
  Separator,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import { useDeleteStore, useEditStore, useSuccessStore } from "@spt/store";

const AdsDetails = () => {
  const navigate = useNavigate();
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);

  // const { data, isLoading } = useSpoilDetailsQuery(Number(id));

  // if (isLoading) return <LoadingState />;

  const handleEditAds = () => {
    setIsEdit(true);
    navigate(routes.main.ads.editAd);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteAds = () => {
    setOpenSuccess(true);
  };

  const adsDetails = [
    { title: "Title", value: "Ads 1" },
    { title: "URL", value: "www.shopify.com" },
    {
      title: "Start Date",
      value: "12-10-2025",
    },
    {
      title: "End Date",
      value: "12-10-2025",
    },
    {
      title: "Category",
      value: "UI/UX Design",
    },
    {
      title: "Ad Size",
      value: "Medium",
    },
  ];

  return (
    <Stack>
      <Breadcrumb
        previousLink="Ads"
        currentLink="View Ads Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "6" }}>
          <Flex align="center" justify="space-between" w="100%">
            <Heading size={{ base: "sm", md: "lg" }}>Ads Details</Heading>

            <HStack gap={3}>
              <Button variant="yellow" onClick={handleEditAds} flex="1">
                <Image src="/edit.svg" alt="add" />
                Edit Ads
              </Button>

              <Button
                variant="dangerOutline"
                onClick={handleDeleteClick}
                flex="1"
              >
                <Image src="/trash.svg" alt="add" />
                Delete Ads
              </Button>
            </HStack>
          </Flex>

          <Stack gap="6">
            {adsDetails.map((_, index) => (
              <Stack key={index} gap="6">
                <Grid templateColumns="repeat(3, 1fr)" gap="6">
                  {adsDetails
                    .slice(index * 3, (index + 1) * 3)
                    .map((detail, detailIndex) => (
                      <InfoDisplay
                        title={detail.title}
                        value={detail.value}
                        key={detailIndex}
                      />
                    ))}
                </Grid>
                {(index + 1) * 3 < adsDetails.length && <Separator />}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Card>

      <Dialog.Root
        open={isDeleteOpen}
        onOpenChange={(details) => setIsDeleteOpen(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <DeleteModalContent
              text="Ad"
              handleClick={handleDeleteAds}
              // isLoading={isDeleteLoading}
              successMessage="Ads deleted successfully!"
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default AdsDetails;
