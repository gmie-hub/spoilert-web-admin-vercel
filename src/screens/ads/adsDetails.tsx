// import {
//   Button,
//   Dialog,
//   Flex,
//   Grid,
//   HStack,
//   Heading,
//   Image,
//   Portal,
//   Separator,
//   Stack,
// } from "@chakra-ui/react";
//   import { useNavigate, useParams } from "react-router-dom";


// import { Breadcrumb, Card } from "@spt/components";
// import DeleteModalContent from "@spt/components/deleteModalContent";
// import LoadingState from "@spt/components/loadingState";
// import { useDeleteAdMutation } from "@spt/hooks/api/useDeleteAdMutation";
// import { useGetAdDetailsQuery } from "@spt/hooks/api/useGetAdDetailsQuery";
// import InfoDisplay from "@spt/partials/infoDisplay";
// import { useDeleteStore, useEditStore } from "@spt/store";


// const AdsDetails = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const setIsEdit = useEditStore((state) => state.setIsEdit);
//   const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
//   const isDeleteOpen = useDeleteStore((state) => state.openDelete);

//   const { data: ad, isLoading, isError, adDetailsErrorMessage } = useGetAdDetailsQuery(Number(id));
//   const { deleteAdHandler, isDeleteLoading, goToAds } = useDeleteAdMutation();
//   if (isLoading) return <LoadingState  />;
//   if (isError || !ad) return <div style={{ color: 'red' }}>{adDetailsErrorMessage || 'Failed to load ad details.'}</div>;

//   const handleEditAds = () => {
//     setIsEdit(true);
//     if (id) {
//       navigate(`/edit-ad/${id}`);
//     }
//   };

//   const handleDeleteClick = () => {
//     setIsDeleteOpen(true);
//   };

//   const handleDeleteAds = () => {
//     if (id) {
//       deleteAdHandler(Number(id));
//     }
//   };
 
//   const adsDetails = [
//     { title: "Title", value: ad[0]?.title },
//     { title: "URL", value: ad[0]?.url },
//     { title: "Start Date", value: ad[0]?.start_date },
//     { title: "End Date", value: ad[0]?.end_date },
//     { title: "Category", value: ad[0]?.category?.name ?? '' },
//     { title: "Ad Size", value: ad[0]?.size },
//     { title: "Status", value: ad[0]?.status },
//     { title: "Clicks", value: ad[0]?.clicks },
//   ];

//   return (
//     <Stack>
//       <Breadcrumb
//         previousLink="Ads"
//         currentLink="View Ads Details"
//         showBackButton
//       />

//       <Card>
//         <Stack mb="2" gap={{ base: "6", md: "6" }}>
//           <Flex align="center" justify="space-between" w="100%">
//             <Heading size={{ base: "sm", md: "lg" }}>Ads Details</Heading>

//             <HStack gap={3}>
//               <Button variant="yellow" onClick={handleEditAds} flex="1">
//                 <Image src="/edit.svg" alt="add" />
//                 Edit Ads
//               </Button>

//               <Button
//                 variant="dangerOutline"
//                 onClick={handleDeleteClick}
//                 flex="1"
//               >
//                 <Image src="/trash.svg" alt="add" />
//                 Delete Ads
//               </Button>
//             </HStack>
//           </Flex>

//           <Stack gap="6">
//             {adsDetails.map((_, index) => (
//               <Stack key={index} gap="6">
//                 <Grid templateColumns="repeat(3, 1fr)" gap="6">
//                   {adsDetails
//                     .slice(index * 3, (index + 1) * 3)
//                     .map((detail, detailIndex) => (
//                       <InfoDisplay
//                         title={detail.title}
//                         value={detail.value}
//                         key={detailIndex}
//                       />
//                     ))}
//                 </Grid>
//                 {(index + 1) * 3 < adsDetails.length && <Separator />}
//               </Stack>
//             ))}
//           </Stack>
//         </Stack>
//       </Card>

//       <Dialog.Root
//         open={isDeleteOpen}
//         onOpenChange={(details) => setIsDeleteOpen(details.open)}
//         placement="center"
//         motionPreset="slide-in-bottom"
//       >
//         <Portal>
//           <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
//           <Dialog.Positioner>
//             <DeleteModalContent
//               text="Ad"
//               handleClick={handleDeleteAds}
//               isLoading={isDeleteLoading}
//               successMessage="Ads deleted successfully!"
//               onSuccessDone={goToAds}
//             />
//           </Dialog.Positioner>
//         </Portal>
//       </Dialog.Root>
//     </Stack>
//   );
// };

// export default AdsDetails;
import { useState } from "react";

import {
  Box,
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
import { useNavigate, useParams } from "react-router-dom";


import { Breadcrumb, Card } from "@spt/components";
import DeleteModalContent from "@spt/components/deleteModalContent";
import LoadingState from "@spt/components/loadingState";
import { useDeleteAdMutation } from "@spt/hooks/api/useDeleteAdMutation";
import { useGetAdDetailsQuery } from "@spt/hooks/api/useGetAdDetailsQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import { useDeleteStore, useEditStore } from "@spt/store";


const AdsDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const setIsDeleteOpen = useDeleteStore((state) => state.setOpenDelete);
  const isDeleteOpen = useDeleteStore((state) => state.openDelete);
  const [showImageModal, setShowImageModal] = useState(false);

  const { data: ad, isLoading, isError, adDetailsErrorMessage } = useGetAdDetailsQuery(Number(id));
  const { deleteAdHandler, isDeleteLoading, goToAds } = useDeleteAdMutation();
  
  if (isLoading) return <LoadingState  />;
  if (isError || !ad) return <div style={{ color: 'red' }}>{adDetailsErrorMessage || 'Failed to load ad details.'}</div>;

  const handleEditAds = () => {
    setIsEdit(true);
    if (id) {
      navigate(`/edit-ad/${id}`);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleDeleteAds = () => {
    if (id) {
      deleteAdHandler(Number(id));
    }
  };
 
  const adsDetails = [
    { title: "Title", value: ad[0]?.title },
    { title: "URL", value: ad[0]?.url },
    { title: "Start Date", value: ad[0]?.start_date },
    { title: "End Date", value: ad[0]?.end_date },
    { title: "Category", value: ad[0]?.category?.name ?? '' },
    { title: "Ad Size", value: ad[0]?.size },
    { title: "Status", value: ad[0]?.status },
    { title: "Clicks", value: ad[0]?.clicks },
  ];

  const hasImage = ad[0]?.image_url;

  return (
    <Stack gap="6">
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
<div          className="flex justify-start w-1/3"
>
          {hasImage && (
          <Button
            variant="outline"
            onClick={() => setShowImageModal(true)}
          >
            View Ad Image
          </Button>
      )}
</div>
      

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
              {/* View Image Button */}

        </Stack>
      </Card>

  

      {/* Image Modal */}
      <Dialog.Root
        open={showImageModal}
        onOpenChange={(details) => setShowImageModal(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
        size="xl"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <Dialog.Body p="6">
                <Box textAlign="center">
                  <img
                    src={ad[0]?.image_url}
                    alt="Ad Full View"
                    style={{
                     maxWidth: "100%",
                      maxHeight: "80vh",
                      borderRadius: "8px"
                    }}
                  />
                </Box>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* Delete Modal */}
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
              isLoading={isDeleteLoading}
              successMessage="Ads deleted successfully!"
              onSuccessDone={goToAds}
            />
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default AdsDetails;