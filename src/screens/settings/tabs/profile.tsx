import { Button, HStack, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import { useEditStore } from "@spt/store";

const Profile = () => {
  const setIsEdit = useEditStore((state) => state.setIsEdit);

  const handleEdit = () => setIsEdit(true);

  return (
    <Stack gap="6">
      <HStack justifyContent="space-between" alignItems="center">
        <Image src="/user-icon.svg" alt="info" h="60px" w="60px" />

        <Button variant="yellow" onClick={handleEdit}>
          <Image src="edit.svg" alt="edit" /> Edit Profile
        </Button>
      </HStack>

      <ProgressInfo>
        <InfoDisplay title="Full Name" value="Ogunsola Omorinsola" />
        <InfoDisplay
          title="Email Address"
          value="ogunsolaomorinsola@gmail.com"
        />
        <InfoDisplay title="Last Login" value="21-02-2025" />
      </ProgressInfo>
    </Stack>
  );
};

export default Profile;
