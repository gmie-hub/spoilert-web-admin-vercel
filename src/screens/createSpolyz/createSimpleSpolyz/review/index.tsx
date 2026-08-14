import { useEffect, useState } from "react";

import { Button, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import { useCreateCommunityMutation } from "@spt/hooks/api/useCreateCommunityMutation";
import { usePublishSpoilMutation } from "@spt/hooks/api/usePublishSpoilMutation";
import { routes } from "@spt/routes";
import {
  getTutorDisplayName,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import CertificateSection from "../components/certificateSection";
import CommunitySuccessModal from "../components/communitySuccessModal";
import PublishSuccessModal from "../components/publishSuccessModal";
import SpolyzBasicsReview from "../components/spolyzBasicsReview";

const ReviewSimpleSpolyz = () => {
  const navigate = useNavigate();
  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);
  const simpleDraft = useCreateSpolyzStore((s) => s.simpleDraft);
  const setSpoilId = useCreateSpolyzStore((s) => s.setSpoilId);
  const reset = useCreateSpolyzStore((s) => s.reset);

  const { publishSpoil, isPublishing } = usePublishSpoilMutation();
  const { createCommunity, isCreatingCommunity } = useCreateCommunityMutation();

  const [publishSuccessOpen, setPublishSuccessOpen] = useState(false);
  const [communitySuccessOpen, setCommunitySuccessOpen] = useState(false);
  const [publishedSpoilId, setPublishedSpoilId] = useState<number | null>(null);

  useEffect(() => {
    if (!selectedTutor) {
      navigate(routes.main.createSpolyz.home);
      return;
    }

    if (!simpleDraft) {
      navigate(routes.main.createSpolyz.simple);
    }
  }, [selectedTutor, simpleDraft, navigate]);

  if (!selectedTutor || !simpleDraft) return null;

  const tutorName = getTutorDisplayName(selectedTutor);

  const handlePublish = async () => {
    const response = await publishSpoil({
      tutor_id: selectedTutor.id,
      draft: simpleDraft,
    });

    const spoilId = response?.data?.id ?? response?.data?.data?.id ?? null;
    setPublishedSpoilId(spoilId);
    if (spoilId) setSpoilId(spoilId);
    setPublishSuccessOpen(true);
  };

  const handleCreateCommunity = async () => {
    const spoilId = publishedSpoilId;

    if (spoilId) {
      await createCommunity({
        spoil_id: spoilId,
        name: `${simpleDraft.title} Community`,
        description: simpleDraft.description,
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

  return (
    <>
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
          <Stack gap="8">
            <CertificateSection />

            <Stack gap="6">
              <Text fontSize="md" fontWeight="semibold">
                Review the Spoylz you created and publish
              </Text>

              <SpolyzBasicsReview draft={simpleDraft} />
            </Stack>

            <Button
              variant="yellow"
              w="full"
              loading={isPublishing}
              onClick={handlePublish}
            >
              Publish Spoylz
            </Button>
          </Stack>
        </Card>
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

export default ReviewSimpleSpolyz;
