import { type FC } from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { AdvancedSpolyzDraft } from "@spt/store/createSpolyzStore";
import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";
import { formatCurrency } from "@spt/utils/currency";

import CertificateSection from "../../createSimpleSpolyz/components/certificateSection";

import { formatQuizSummary } from "./quizSummary";

const formatExpiryDate = (date?: string) => {
  if (!date) return "—";
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return date;
  return `${day}-${month}-${year}`;
};

const formatPricing = (pricing?: string) => {
  if (!pricing) return "—";
  return pricing.charAt(0).toUpperCase() + pricing.slice(1);
};

interface AdvancedReviewContentProps {
  draft: AdvancedSpolyzDraft;
  onEditBasics: () => void;
}

const AdvancedReviewContent: FC<AdvancedReviewContentProps> = ({
  draft,
  onEditBasics,
}) => {
  const learningItems = draft.what_to_learn
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Stack gap="6">
      <CertificateSection />

      <Stack gap="4">
        <Text fontSize="md" fontWeight="semibold">
          Review the Spoylz you created and publish
        </Text>

        <Flex
          align="center"
          justify="space-between"
          bg="#EAF6FA"
          borderRadius="xl"
          px="5"
          py="3"
        >
          <Text fontSize="md" fontWeight="semibold">
            Spoylz Basics
          </Text>
          <Button variant="yellowOutline" size="sm" py="2" onClick={onEditBasics}>
            <HStack gap="2">
              <Image src="/edit-dark.svg" alt="" boxSize="4" />
              <Text>Edit</Text>
            </HStack>
          </Button>
        </Flex>

        <Stack gap="4">
          <Box
            w="20"
            h="20"
            borderRadius="xl"
            overflow="hidden"
            border="1px solid #EFEFEF"
          >
            <Image
              src={draft.cover_preview}
              alt="Cover"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>

          <ProgressInfo>
            <InfoDisplay title="Spoylz Title" value={draft.title} />
            <InfoDisplay title="Category" value={draft.category_name} />
            <InfoDisplay title="Pricing" value={formatPricing(draft.pricing)} />
          </ProgressInfo>

          <ProgressInfo>
            <InfoDisplay
              title="Institution"
              value={draft.institution || "—"}
            />
            <InfoDisplay title="Course Code" value={draft.course_code || "—"} />
            <InfoDisplay
              title="Amount"
              value={
                draft.pricing === "free"
                  ? "Free"
                  : formatCurrency(draft.amount).replace("₦", "N")
              }
            />
          </ProgressInfo>

          <ProgressInfo>
            <InfoDisplay
              title="Expiry Date"
              value={formatExpiryDate(draft.expires_at)}
            />
            <InfoDisplay title="Modules" value={draft.modules_count} />
            <InfoDisplay title="Lessons" value={draft.lessons_count} />
          </ProgressInfo>

          <ProgressInfo>
            <InfoDisplay
              flex={{ md: "0 0 100%" }}
              title="Description"
              value={draft.description}
            />
          </ProgressInfo>

          <Stack gap="2">
            <Text fontSize="sm" color="gray.100">
              What they will learn
            </Text>
            <Box ms="6">
              <List.Root>
                {learningItems.map((item, index) => (
                  <List.Item key={index} _marker={{ color: "#212529" }}>
                    {item}
                  </List.Item>
                ))}
              </List.Root>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Stack gap="3">
        <Text fontSize="md" fontWeight="semibold">
          Quizzes
        </Text>

        <ProgressInfo>
          <InfoDisplay
            title="Pre-Spoylz Quiz"
            value={
              draft.pre_quiz
                ? `${draft.pre_quiz.title} · ${formatQuizSummary(draft.pre_quiz)}`
                : "Not added"
            }
          />
          <InfoDisplay
            title="Post-Spoylz Quiz"
            value={
              draft.post_quiz
                ? `${draft.post_quiz.title} · ${formatQuizSummary(draft.post_quiz)}`
                : "Not added"
            }
          />
        </ProgressInfo>
      </Stack>

      <Stack gap="3">
        <Text fontSize="md" fontWeight="semibold">
          Modules & Lessons
        </Text>

        {draft.modules.map((module, index) => (
          <Box
            key={module.id}
            border="1px solid #EFEFEF"
            borderRadius="xl"
            p="4"
            bg="#FBFBFB"
          >
            <Text fontSize="sm" fontWeight="semibold" mb="1">
              Module {index + 1}: {module.title}
            </Text>
            <Text fontSize="xs" color="gray.500" mb="3">
              {module.description}
            </Text>

            <Stack gap="2">
              {module.lessons.map((lesson, lessonIndex) => (
                <Text key={lesson.id} fontSize="sm">
                  Lesson {lessonIndex + 1}: {lesson.title} (
                  {lesson.type === "file" && lesson.content_file
                    ? `File · ${lesson.content_file.name}`
                    : lesson.type}
                  )
                </Text>
              ))}

              {module.quiz && (
                <Text fontSize="sm" color="gray.600">
                  Quiz: {module.quiz.title} ·{" "}
                  {formatQuizSummary(module.quiz)}
                </Text>
              )}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

interface AdvancedReviewStepProps {
  onPrevious: () => void;
  onPublish: () => void;
  isPublishing: boolean;
}

const AdvancedReviewStep: FC<AdvancedReviewStepProps> = ({
  onPrevious,
  onPublish,
  isPublishing,
}) => {
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setAdvancedStep = useCreateSpolyzStore((s) => s.setAdvancedStep);

  if (!advancedDraft) return null;

  return (
    <Stack gap="6">
      <Stack gap="1">
        <Text fontSize="md" fontWeight="semibold">
          Spoylz Review
        </Text>
      </Stack>

      <AdvancedReviewContent
        draft={advancedDraft}
        onEditBasics={() => setAdvancedStep("basics")}
      />

      <Flex gap="3" direction={{ base: "column", sm: "row" }}>
        <Button variant="yellowOutline" flex="1" onClick={onPrevious}>
          Previous
        </Button>
        <Button
          variant="yellow"
          flex="1"
          loading={isPublishing}
          onClick={onPublish}
        >
          Publish Spoylz
        </Button>
      </Flex>
    </Stack>
  );
};

export default AdvancedReviewStep;
