import { useEffect } from "react";

import { Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import { routes } from "@spt/routes";
import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";

import SimpleSpolyzForm from "./simpleSpolyzForm";

const CreateSimpleSpolyz = () => {
  const navigate = useNavigate();
  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);
  const spolyzType = useCreateSpolyzStore((s) => s.spolyzType);

  useEffect(() => {
    if (!selectedTutor) {
      navigate(routes.main.createSpolyz.home);
      return;
    }

    if (spolyzType && spolyzType !== "simple") {
      navigate(routes.main.createSpolyz.advanced);
    }
  }, [selectedTutor, spolyzType, navigate]);

  if (!selectedTutor) return null;

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Create Spoylz"
        currentLink="Create a Simple Spoylz"
        previousHref={routes.main.createSpolyz.home}
        showBackButton
      />

      <Text fontSize="lg" fontWeight="semibold">
        Create a Simple Spoylz
      </Text>

      <Card>
        <SimpleSpolyzForm />
      </Card>
    </Stack>
  );
};

export default CreateSimpleSpolyz;
