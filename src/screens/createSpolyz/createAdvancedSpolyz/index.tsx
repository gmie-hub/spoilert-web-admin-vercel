import { useEffect } from "react";

import { Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import { routes } from "@spt/routes";
import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";

const CreateAdvancedSpolyz = () => {
  const navigate = useNavigate();
  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);

  useEffect(() => {
    if (!selectedTutor) {
      navigate(routes.main.createSpolyz.home);
    }
  }, [selectedTutor, navigate]);

  if (!selectedTutor) return null;

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Create Spoylz"
        currentLink="Create an Advanced Spoylz"
        previousHref={routes.main.createSpolyz.home}
        showBackButton
      />

      <Text fontSize="lg" fontWeight="semibold">
        Create an Advanced Spoylz
      </Text>

      <Card>
        <Text fontSize="sm" color="gray.500">
          Advanced Spoylz creation is coming soon. Share the design when you are
          ready and we will build it next.
        </Text>
      </Card>
    </Stack>
  );
};

export default CreateAdvancedSpolyz;
