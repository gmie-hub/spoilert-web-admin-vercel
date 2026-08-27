import { useEffect, useState } from "react";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import { useCreateCommunityMutation } from "@spt/hooks/api/useCreateCommunityMutation";
import {
  getCreatedSpoilId,
  usePublishAdvancedSpoilMutation,
} from "@spt/hooks/api/usePublishAdvancedSpoilMutation";
import { routes } from "@spt/routes";
import {
  getTutorDisplayName,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import CommunitySuccessModal from "../createSimpleSpolyz/components/communitySuccessModal";
import PublishSuccessModal from "../createSimpleSpolyz/components/publishSuccessModal";

import AdvancedBasicsForm from "./components/advancedBasicsForm";
import AdvancedReviewStep from "./components/advancedReviewStep";
import SpolyzOutlineStep from "./components/spolyzOutlineStep";
import SpolyzProgressStepper from "./components/spolyzProgressStepper";

const CreateAdvancedSpolyz = () => {
  const navigate = useNavigate();
  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);
  const spolyzType = useCreateSpolyzStore((s) => s.spolyzType);
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const advancedStep = useCreateSpolyzStore((s) => s.advancedStep);
  const setAdvancedStep = useCreateSpolyzStore((s) => s.setAdvancedStep);
  const setSpoilId = useCreateSpolyzStore((s) => s.setSpoilId);
  const reset = useCreateSpolyzStore((s) => s.reset);

  const { publishAdvancedSpoil, isPublishing } =
    usePublishAdvancedSpoilMutation();
  const { createCommunity, isCreatingCommunity } = useCreateCommunityMutation();

  const [publishSuccessOpen, setPublishSuccessOpen] = useState(false);
  const [communitySuccessOpen, setCommunitySuccessOpen] = useState(false);
  const [publishedSpoilId, setPublishedSpoilId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedTutor) {
      navigate(routes.main.createSpolyz.home);
      return;
    }

    if (spolyzType && spolyzType !== "advanced") {
      navigate(routes.main.createSpolyz.simple);
    }
  }, [selectedTutor, spolyzType, navigate]);

  if (!selectedTutor) return null;

  const tutorName = getTutorDisplayName(selectedTutor);

  const handlePublish = async () => {
    if (!advancedDraft) return;

    const response = await publishAdvancedSpoil({
      tutor_id: selectedTutor.id,
      draft: advancedDraft,
    });

    const spoilId = getCreatedSpoilId(response);
    setPublishedSpoilId(spoilId);
    if (spoilId) setSpoilId(spoilId);
    setPublishSuccessOpen(true);
  };

  const handleCreateCommunity = async () => {
    if (publishedSpoilId && advancedDraft) {
      await createCommunity({
        spoil_id: publishedSpoilId,
        name: `${advancedDraft.title} Community`,
        description: advancedDraft.description,
      });
    }

    setPublishSuccessOpen(false);
    setCommunitySuccessOpen(true);
  };

  const handleFinish = () => {
    setCommunitySuccessOpen(false);
    setPublishSuccessOpen(false);
    reset();
    navigate(routes.main.createSpolyz.home);
  };

  const renderStepContent = () => {
    switch (advancedStep) {
      case "basics":
        return (
          <AdvancedBasicsForm
            onContinue={() => setAdvancedStep("outline")}
          />
        );
      case "outline":
        return (
          <SpolyzOutlineStep
            onPrevious={() => setAdvancedStep("basics")}
            onContinue={() => setAdvancedStep("review")}
          />
        );
      case "review":
        return (
          <AdvancedReviewStep
            onPrevious={() => setAdvancedStep("outline")}
            onPublish={handlePublish}
            isPublishing={isPublishing}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
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

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap="4"
          align="flex-start"
        >
          <Card
            w={{ base: "full", lg: "auto" }}
            flex={{ base: "0 0 auto", lg: "2 1 0" }}
            minW="0"
            alignSelf="stretch"
          >
            <SpolyzProgressStepper currentStep={advancedStep} />
          </Card>

          <Box
            flex={{ base: "0 0 auto", lg: "3 1 0" }}
            minW="0"
            w={{ base: "full", lg: "auto" }}
          >
            <Card flex="1">{renderStepContent()}</Card>
          </Box>
        </Flex>
      </Stack>

      <PublishSuccessModal
        open={publishSuccessOpen}
        tutorName={tutorName}
        isCreatingCommunity={isCreatingCommunity}
        onCreateCommunity={handleCreateCommunity}
        onSkip={handleFinish}
      />

      <CommunitySuccessModal
        open={communitySuccessOpen}
        onClose={handleFinish}
      />
    </>
  );
};

export default CreateAdvancedSpolyz;
