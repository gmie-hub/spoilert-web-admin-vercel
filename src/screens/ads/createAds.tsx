  // import { useEffect } from "react";

  // import { Dialog, Heading, Portal, Stack } from "@chakra-ui/react";
  // import { useNavigate, useParams } from "react-router-dom";

  // import { Breadcrumb, Card } from "@spt/components";
  // import LoadingState from "@spt/components/loadingState";
  // import SuccessModalContent from "@spt/components/successModalContent";
  // import { useGetAdDetailsQuery } from "@spt/hooks/api/useGetAdDetailsQuery";
  // import { useEditStore, useSuccessStore } from "@spt/store";

  // import AdsForm from "./form/adsForm";

  // const CreateAds = () => {
  //   const openSuccess = useSuccessStore((state) => state.openSuccess);
  //   const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  //   const isEdit = useEditStore((state) => state.isEdit);
  //   const setIsEdit = useEditStore((state) => state.setIsEdit);
  //   const navigate = useNavigate();
  //   const { id } = useParams();

  //   useEffect(() => {
  //     setIsEdit(!!id);
  //   }, [id, setIsEdit]);

  //   const { data: ad, isLoading, isError, adDetailsErrorMessage } = useGetAdDetailsQuery(
  //     id ? Number(id) : 0,
  //   );

  //   const handleSuccessDone = () => {
  //     setOpenSuccess(false);
  //     navigate("/ads");
  //   };

  //   if (id && isLoading) return <LoadingState />;
  //   if (id && (isError || !ad))
  //     return <div style={{ color: "red" }}>{adDetailsErrorMessage || "Failed to load ad details."}</div>;

  //   const adData = Array.isArray(ad) ? ad[0] : ad;

  // const toDateInputValue = (date?: string | null) => {
  //   if (!date) return "";
  //   // Handle both ISO format and other date formats
  //   try {
  //     return date.split("T")[0];
  //   } catch {
  //     return "";
  //   }
  // };

  //   const initialValues = adData
  //     ? {
  //         title: adData.title || "",
  //         url: adData.url || "",
  //         category_id: adData.category_id?.toString() || "",
  //         size: adData.size || "",
  //         start_date: toDateInputValue(adData?.start_date),
  //         end_date: toDateInputValue(adData?.end_date),
  //         status: adData.status || "enabled",
  //         image: null,
  //       }
  //     : undefined;

  //   return (
  //     <Stack gap="5">
  //       <Breadcrumb
  //         previousLink="Ads"
  //         currentLink={isEdit ? "Edit Ads" : "Create Ads"}
  //         showBackButton
  //       />

  //       <Card>
  //         <Stack gap="6">
  //           <Heading>{isEdit ? "Edit" : "Create"} Ads</Heading>

  //           <AdsForm initialValues={initialValues} isEdit={isEdit} adId={id ? Number(id) : undefined} />
  //         </Stack>
  //       </Card>

  //       <Dialog.Root
  //         open={openSuccess}
  //         onOpenChange={(details) => setOpenSuccess(details.open)}
  //         placement="center"
  //         motionPreset="slide-in-bottom"
  //       >
  //         <Portal>
  //           <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
  //           <Dialog.Positioner>
  //             <Dialog.Content>
  //               <Dialog.Body>
  //                 <SuccessModalContent
  //                   heading={isEdit ? "Ad Updated Successfully" : "Ad Created Successfully"}  
  //                   onClick={handleSuccessDone}
  //                 />
  //               </Dialog.Body>
  //             </Dialog.Content>
  //           </Dialog.Positioner>
  //         </Portal>
  //       </Dialog.Root>
  //     </Stack>
  //   );
  // };

  // export default CreateAds;


  import { useEffect } from "react";

import { Dialog, Heading, Portal, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import SuccessModalContent from "@spt/components/successModalContent";
import { useGetAdDetailsQuery } from "@spt/hooks/api/useGetAdDetailsQuery";
import { useEditStore, useSuccessStore } from "@spt/store";

import AdsForm from "./form/adsForm";

const CreateAds = () => {
  const openSuccess = useSuccessStore((state) => state.openSuccess);
  const setOpenSuccess = useSuccessStore((state) => state.setOpenSuccess);
  const isEdit = useEditStore((state) => state.isEdit);
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setIsEdit(!!id);
  }, [id, setIsEdit]);

  const { data: ad, isLoading, isError, adDetailsErrorMessage } = useGetAdDetailsQuery(
    id ? Number(id) : 0,
  );

  const handleSuccessDone = () => {
    setOpenSuccess(false);
    navigate("/ads");
  };

  if (id && isLoading) return <LoadingState />;
  if (id && (isError || !ad))
    return <div style={{ color: "red" }}>{adDetailsErrorMessage || "Failed to load ad details."}</div>;

  const adData = Array.isArray(ad) ? ad[0] : ad;

  /**
   * Convert date string to YYYY-MM-DD format for HTML date input
   * Handles ISO format (2024-01-15T00:00:00Z) and other date formats
   */
  const toDateInputValue = (date?: string | null): string => {
    if (!date) return "";
    try {
      // Extract just the date part (YYYY-MM-DD) from any date format
      const dateObj = new Date(date);
      // Check if date is valid
      if (isNaN(dateObj.getTime())) return "";
      // Return in YYYY-MM-DD format (required by HTML date input)
      return dateObj.toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const initialValues = adData
    ? {
        title: adData.title || "",
        url: adData.url || "",
        category_id: adData.category_id?.toString() || "",
        size: adData.size || "",
        start_date: toDateInputValue(adData.start_date),
        end_date: toDateInputValue(adData.end_date),
        status: adData.status || "enabled",
        image_url: adData.image_url || "",
        image: null,
      }
    : undefined;

  return (
    <Stack gap="5">
      <Breadcrumb
        previousLink="Ads"
        currentLink={isEdit ? "Edit Ads" : "Create Ads"}
        showBackButton
      />

      <Card>
        <Stack gap="6">
          <Heading>{isEdit ? "Edit" : "Create"} Ads</Heading>

          <AdsForm initialValues={initialValues} isEdit={isEdit} adId={id ? Number(id) : undefined} />
        </Stack>
      </Card>

      <Dialog.Root
        open={openSuccess}
        onOpenChange={(details) => setOpenSuccess(details.open)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(2px)" />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Body>
                <SuccessModalContent
                  heading={isEdit ? "Ad Updated Successfully" : "Ad Created Successfully"}  
                  onClick={handleSuccessDone}
                />
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Stack>
  );
};

export default CreateAds;