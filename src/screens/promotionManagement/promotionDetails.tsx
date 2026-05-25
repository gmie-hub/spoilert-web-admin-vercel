import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Tabs,
} from "@chakra-ui/react";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import LoadingState from "@spt/components/loadingState";
import CustomTabs from "@spt/components/tabs";
import { useGetPromotionPackagesQuery } from "@spt/hooks/api/useGetPromotionPackagesQuery";
import { useGetPromotionsQuery } from "@spt/hooks/api/useGetPromotionsQuery";
import { routes } from "@spt/routes";
import type { Promotion } from "@spt/types/promotion";
import { promotionsManagementTabList } from "@spt/utils/promotionsData";

import Metrics from "./tabs/metrics";
import PromotionManagementOverview from "./tabs/overview";

const PromotionManagementDetails = () => {
  const { id } = useParams();
  const promotionId = Number(id);
  const location = useLocation();
  const navigate = useNavigate();
  const promotionFromState = (
    location.state as { promotion?: Promotion } | null
  )?.promotion;

  // Fall back to the list query only when we don't have the promotion from navigation state
  const shouldFetchList = !promotionFromState;
  const { data, isLoading, isError, errorMessage } = useGetPromotionsQuery(1);

  const promotion =
    promotionFromState ?? data?.data?.find((p) => p.id === promotionId);

  // Resolve the promotion package (name + duration) from its id
  const { data: packagesData } = useGetPromotionPackagesQuery(1);
  const promotionPackage = packagesData?.data?.find(
    (pkg) => pkg.id === promotion?.promotion_package_id
  );

  if (shouldFetchList && isLoading) return <LoadingState />;
  if (shouldFetchList && isError)
    return (
      <Box color="red.500">{errorMessage || "Failed to load promotion."}</Box>
    );
  if (!promotion) return <Box>Promotion not found.</Box>;

  const tutorId = promotion.spoil?.tutor?.id ?? promotion.spoil?.tutor_id;
  const spoilId = promotion.spoil_id ?? promotion.spoil?.id;

  const handleViewTutorProfile = () => {
    if (!tutorId) return;
    navigate(generatePath(routes.main.tutors.tutorDetails, { id: tutorId }));
  };

  const handleViewSpoilDetails = () => {
    if (!spoilId) return;
    navigate(generatePath(routes.main.spoilMgt.spoilDetails, { id: spoilId }));
  };

  return (
    <Stack>
      <Breadcrumb
        previousLink="Promotions Management"
        currentLink="View Promotion Managetion Details"
        showBackButton
      />

      <Card>
        <Stack mb="2" gap={{ base: "6", md: "4" }}>
          <Flex align="center" justify="space-between" w="100%">
            <Heading size={{ base: "sm", md: "lg" }}>
              Promotion Management Details
            </Heading>

            <HStack gap={3}>
              <Button
                variant="yellow"
                flex="1"
                disabled={!tutorId}
                onClick={handleViewTutorProfile}
              >
                <Image src="/eye.svg" alt="eye" />
                View Tutor's Profile
              </Button>

              <Button
                variant="yellowOutline"
                flex="1"
                disabled={!spoilId}
                onClick={handleViewSpoilDetails}
              >
                <Image src="/blue-eye.svg" alt="eye" />
                View Spoil Details
              </Button>
            </HStack>
          </Flex>

          <CustomTabs tabList={promotionsManagementTabList}>
            <>
              <Tabs.Content value="Overview">
                <PromotionManagementOverview
                  promotion={promotion}
                  promotionPackage={promotionPackage}
                />
              </Tabs.Content>

              <Tabs.Content value="Metric">
                <Metrics />
              </Tabs.Content>
            </>
          </CustomTabs>
        </Stack>
      </Card>
    </Stack>
  );
};

export default PromotionManagementDetails;
