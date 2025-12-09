import { Button, HStack, Image, Stack } from "@chakra-ui/react";

import ErrorState from "@spt/components/errorState";
import LoadingState from "@spt/components/loadingState";
import { useUserDetailsQuery } from "@spt/hooks/api/useGetUserByIdQuery";
import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { useEditStore } from "@spt/store";
import { useAuthStore } from "@spt/store/useAuthStore";

const Profile = () => {
  const setIsEdit = useEditStore((state) => state.setIsEdit);
  const user = useAuthStore((state) => state.user);

  const handleEdit = () => setIsEdit(true);
  const { userData, userLoading, userIsError, userErrorMessage } =
    useUserDetailsQuery(Number(user?.id));

  if (userLoading) return <LoadingState />;

  if (userIsError) return <ErrorState error={userErrorMessage} />;

  return (
    <Stack gap="6">
      <HStack justifyContent="space-between" alignItems="center">
        <Image
          borderRadius="full"
          overflow="hidden"
          h="80px"
          w="80px"
          src={userData?.avatar || "/user-icon.svg"}
          alt="info"
        />

        <Button variant="yellow" onClick={handleEdit}>
          <Image src="edit.svg" alt="edit" /> Edit Profile
        </Button>
      </HStack>

      <ProgressInfo>
        <InfoDisplay
          title="Full Name"
          value={`${userData?.first_name || ""} ${userData?.middie_name || ""} ${userData?.last_name || ""}`.trim()}
        />{" "}
        <InfoDisplay title="Email Address" value={userData?.email} />
        <InfoDisplay title="Last Login" value={userData?.last_login} />
      </ProgressInfo>
    </Stack>
  );
};

export default Profile;
