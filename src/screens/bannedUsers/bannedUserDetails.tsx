import { useState } from "react";

import { Box, Button, Flex, Heading, Icon, Separator, Stack, Text } from "@chakra-ui/react";
import { HiOutlineBan, HiOutlineEye } from "react-icons/hi";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Breadcrumb, Card, ConfirmDialog, SuccessDialog } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import type { BannedUser } from "@spt/types/bannedUser";
import { formatDate } from "@spt/utils/dateTime";

import { getBannedUserById } from "./data";

const BannedUserDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const bannedUser =
    (state as { bannedUser?: BannedUser })?.bannedUser ?? getBannedUserById(id);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  if (!bannedUser) {
    return (
      <ErrorState error="No banned user selected. Please go back and select a user." />
    );
  }

  const handleConfirmLift = () => {
    setConfirmOpen(false);
    setSuccessOpen(true);
  };

  const handleSuccessDone = () => {
    setSuccessOpen(false);
    navigate(routes.main.bannedUsers.home);
  };

  const goToUserProfile = () =>
    navigate(
      generatePath(routes.main.tutors.tutorDetails, {
        id: bannedUser.user.id,
        spoil_id: undefined,
      })
    );

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Banned Users"
        currentLink="View Banned User Details"
        previousHref={routes.main.bannedUsers.home}
      />

      <Card>
        <Stack gap="6">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ md: "center" }}
            rowGap="4"
          >
            <Heading size={{ base: "md", md: "lg" }}>
              Banned User Details
            </Heading>

            <Flex direction={{ base: "column", sm: "row" }} gap="3">
              <Button variant="yellowOutline" onClick={() => setConfirmOpen(true)}>
                <Icon as={HiOutlineBan} /> Lift Ban on user
              </Button>

              <Button variant="yellow" onClick={goToUserProfile}>
                <Icon as={HiOutlineEye} /> View User Profile
              </Button>
            </Flex>
          </Flex>

          <Stack gap="2">
            <Flex justify="space-between" rowGap="4" wrap="wrap">
              <InfoDisplay
                title="Name of User"
                value={bannedUser.user.name}
                flex={{ base: "1 0 50%", md: "0 0 33%" }}
              />
              <InfoDisplay
                title="Timeframe"
                value={bannedUser.timeframe}
                flex={{ base: "1 0 50%", md: "0 0 33%" }}
              />
              <InfoDisplay
                title="Ban Start Date"
                value={formatDate(bannedUser.banStartDate)}
                flex={{ base: "1 0 50%", md: "0 0 33%" }}
              />
            </Flex>

            <Separator />
          </Stack>

          <Stack gap="2">
            <InfoDisplay
              title="Ban End Date"
              value={formatDate(bannedUser.banEndDate)}
              flex="1"
            />

            <Separator />
          </Stack>

          <Box>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
              Reason For Ban
            </Text>
            <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
              {bannedUser.reason}
            </Text>
            <Separator mt="4" />
          </Box>
        </Stack>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Are you sure you want to lift the ban on this user?"
        description="This user will regain access to the platform once the ban is lifted"
        confirmLabel="Yes, Lift Ban"
        onOpenChange={setConfirmOpen}
        onConfirm={handleConfirmLift}
      />

      <SuccessDialog
        open={successOpen}
        message="The Ban on This User Has Been Lifted Successfully"
        onOpenChange={(open) => {
          if (!open) handleSuccessDone();
        }}
      />
    </Stack>
  );
};

export default BannedUserDetails;
