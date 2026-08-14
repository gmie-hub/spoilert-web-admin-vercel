import { useEffect, useMemo, useState } from "react";

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Breadcrumb, Card } from "@spt/components";
import { routes } from "@spt/routes";
import {
  type QuizDraft,
  createEmptyQuizDraft,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import QuizOverviewStep from "./components/quizOverviewStep";
import QuizProgressStepper from "./components/quizProgressStepper";
import QuizQuestionsStep from "./components/quizQuestionsStep";
import QuizReviewStep from "./components/quizReviewStep";
import {
  type QuizStep,
  type QuizVariant,
  quizPageTitles,
  quizProgressTitles,
  quizReviewTitles,
} from "./quizConfig";

const resolveVariant = (
  pathname: string,
  moduleId?: string,
): QuizVariant | null => {
  if (pathname.includes("/quiz/pre")) return "pre";
  if (pathname.includes("/quiz/post")) return "post";
  if (pathname.includes("/quiz/module") && moduleId) return "module";
  return null;
};

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { moduleId } = useParams<{ moduleId: string }>();

  const selectedTutor = useCreateSpolyzStore((s) => s.selectedTutor);
  const spolyzType = useCreateSpolyzStore((s) => s.spolyzType);
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setAdvancedDraft = useCreateSpolyzStore((s) => s.setAdvancedDraft);
  const setAdvancedStep = useCreateSpolyzStore((s) => s.setAdvancedStep);

  const variant = useMemo(
    () => resolveVariant(pathname, moduleId),
    [pathname, moduleId],
  );

  const module = moduleId
    ? advancedDraft?.modules.find((item) => item.id === moduleId)
    : undefined;

  const initialQuiz = useMemo((): QuizDraft => {
    if (!variant || !advancedDraft) return createEmptyQuizDraft();

    if (variant === "pre") {
      return advancedDraft.pre_quiz ?? createEmptyQuizDraft();
    }

    if (variant === "post") {
      return advancedDraft.post_quiz ?? createEmptyQuizDraft();
    }

    return module?.quiz ?? createEmptyQuizDraft();
  }, [variant, advancedDraft, module]);

  const [step, setStep] = useState<QuizStep>("overview");
  const [quizDraft, setQuizDraft] = useState<QuizDraft>(initialQuiz);

  useEffect(() => {
    setQuizDraft(initialQuiz);
  }, [initialQuiz]);

  useEffect(() => {
    if (!selectedTutor || spolyzType !== "advanced" || !advancedDraft) {
      navigate(routes.main.createSpolyz.home);
      return;
    }

    if (!variant) {
      navigate(routes.main.createSpolyz.advanced);
      return;
    }

    if (variant === "module" && !module) {
      navigate(routes.main.createSpolyz.advanced);
      return;
    }

    setAdvancedStep("outline");
  }, [selectedTutor, spolyzType, advancedDraft, variant, module, navigate, setAdvancedStep]);

  if (
    !selectedTutor ||
    !advancedDraft ||
    !variant ||
    (variant === "module" && !module)
  ) {
    return null;
  }

  const saveQuizToStore = (quiz: QuizDraft) => {
    if (variant === "pre") {
      setAdvancedDraft({ ...advancedDraft, pre_quiz: quiz });
      return;
    }

    if (variant === "post") {
      setAdvancedDraft({ ...advancedDraft, post_quiz: quiz });
      return;
    }

    if (moduleId) {
      setAdvancedDraft({
        ...advancedDraft,
        modules: advancedDraft.modules.map((item) =>
          item.id === moduleId ? { ...item, quiz } : item,
        ),
      });
    }
  };

  const goBackToOutline = () => {
    setAdvancedStep("outline");
    navigate(routes.main.createSpolyz.advanced);
  };

  const handleOverviewContinue = (values: {
    title: string;
    description: string;
    no_of_questions: string;
    time_limit: string;
    pass_mark: string;
  }) => {
    const nextDraft: QuizDraft = {
      ...quizDraft,
      title: values.title.trim(),
      description: values.description.trim(),
      no_of_questions: String(values.no_of_questions),
      time_limit: values.time_limit.trim(),
      pass_mark: variant === "post" ? String(values.pass_mark) : "",
    };

    setQuizDraft(nextDraft);
    saveQuizToStore(nextDraft);
    setStep("questions");
  };

  const handlePublish = () => {
    saveQuizToStore(quizDraft);
    goBackToOutline();
  };

  const renderStep = () => {
    switch (step) {
      case "overview":
        return (
          <QuizOverviewStep
            variant={variant}
            draft={quizDraft}
            onContinue={handleOverviewContinue}
          />
        );
      case "questions":
        return (
          <QuizQuestionsStep
            questions={quizDraft.questions}
            onChange={(questions) =>
              setQuizDraft((prev) => {
                const next = { ...prev, questions };
                saveQuizToStore(next);
                return next;
              })
            }
            onContinue={() => setStep("review")}
            onPrevious={() => setStep("overview")}
          />
        );
      case "review":
        return (
          <QuizReviewStep
            variant={variant}
            title={quizReviewTitles[variant]}
            draft={quizDraft}
            onEditOverview={() => setStep("overview")}
            onEditQuestions={() => setStep("questions")}
            onPublish={handlePublish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Create Spoylz"
        currentLink={quizPageTitles[variant]}
        previousHref={routes.main.createSpolyz.advanced}
        showBackButton
      />

      <Text fontSize="lg" fontWeight="semibold">
        {quizPageTitles[variant]}
      </Text>

      <Flex
        direction={{ base: "column", lg: "row" }}
        gap="4"
        align="flex-start"
      >
        <Card
          w={{ base: "full", lg: "17rem" }}
          maxW={{ lg: "17rem" }}
          flex="0 0 auto"
          alignSelf="stretch"
        >
          <QuizProgressStepper
            title={quizProgressTitles[variant]}
            currentStep={step}
          />
        </Card>

        <Box flex="1" minW="0" w="full">
          <Card flex="1">{renderStep()}</Card>
        </Box>
      </Flex>
    </Stack>
  );
};

export default CreateQuiz;
