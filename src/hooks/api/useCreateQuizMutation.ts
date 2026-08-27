import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { QuizDraft, QuizQuestionDraft } from "@spt/store/createSpolyzStore";
import apiCall from "@spt/utils/apiCall";

export type QuizKind = "pre" | "post" | "module";

export interface CreateQuizPayload {
  quiz: QuizDraft;
  type: QuizKind;
  /** Pre/post quizzes belong to a spoil. */
  spoil_id?: number | string;
  /** Module quizzes belong to a module. */
  module_id?: number | string;
}

/**
 * A local question becomes `{ question, type, answer, options[] }`. Multiple
 * choice sends the option texts and the correct option as the answer;
 * fill-in-the-blank sends the typed answer and no options.
 */
export const buildQuestionPayload = (question: QuizQuestionDraft) => {
  const base = {
    question: question.prompt,
    type: question.type,
    answer:
      question.type === "multiple_choice"
        ? (question.options.find((option) => option.is_correct)?.text ?? "")
        : question.answer,
  };

  if (question.type === "multiple_choice") {
    return { ...base, options: question.options.map((option) => option.text) };
  }

  return base;
};

const buildQuizFormData = ({
  quiz,
  type,
  spoil_id,
  module_id,
}: CreateQuizPayload) => {
  const formData = new FormData();
  formData.append("title", quiz.title);
  formData.append("type", type);
  formData.append("description", quiz.description ?? "");
  formData.append(
    "no_of_questions",
    quiz.no_of_questions || String(quiz.questions.length),
  );

  if (spoil_id !== undefined) formData.append("spoil_id", String(spoil_id));
  if (module_id !== undefined) formData.append("module_id", String(module_id));
  if (quiz.time_limit) formData.append("time_limit", quiz.time_limit);
  if (quiz.pass_mark) formData.append("pass_mark", quiz.pass_mark);

  return formData;
};

export const getCreatedQuizId = (response: any) =>
  response?.data?.id ?? response?.data?.quiz?.id ?? response?.data?.data?.id ?? null;

/**
 * Creates the quiz, then posts its questions in one go. The questions endpoint
 * is `/questions`; older builds of the API expose it as
 * `/quiz/{id}/questions`, so that is used as a fallback.
 */
export const useCreateQuizMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateQuizPayload) => {
      const quizRes = await apiCall().post("quiz", buildQuizFormData(payload), {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const quizId = getCreatedQuizId(quizRes?.data);
      const questions = payload.quiz.questions.map(buildQuestionPayload);

      if (quizId && questions.length > 0) {
        try {
          await apiCall().post("questions", {
            quiz_id: quizId,
            questions,
          });
        } catch {
          await apiCall().post(`quiz/${quizId}/questions`, { questions });
        }
      }

      return quizRes?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message || "Failed to create quiz. Try again.",
      });
    },
  });

  return {
    createQuiz: mutation.mutateAsync,
    isCreatingQuiz: mutation.isPending,
  };
};
