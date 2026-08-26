import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type {
  AdvancedModuleDraft,
  AdvancedSpolyzDraft,
} from "@spt/store/createSpolyzStore";
import apiCall from "@spt/utils/apiCall";
import { resolveCoverImage } from "@spt/utils/coverImage";

import { useCreateLessonMutation } from "./useCreateLessonMutation";
import {
  getCreatedModuleId,
  useCreateModuleMutation,
} from "./useCreateModuleMutation";
import { useCreateQuizMutation } from "./useCreateQuizMutation";
import {
  attachCertificateToSpoil,
  useCreateSpoilTemplateMutation,
} from "./useCreateSpoilTemplateMutation";

export interface PublishAdvancedSpoilPayload {
  tutor_id: number;
  draft: AdvancedSpolyzDraft;
}

export const getCreatedSpoilId = (response: any) =>
  response?.data?.id ??
  response?.data?.spoil_id ??
  response?.data?.data?.id ??
  null;

const buildAdvancedFormData = async (
  tutor_id: number,
  draft: AdvancedSpolyzDraft,
) => {
  const formData = new FormData();
  formData.append("tutor_id", String(tutor_id));
  formData.append("title", draft.title);
  formData.append("category_id", draft.category_id);
  formData.append("description", draft.description);
  formData.append("what_to_learn", draft.what_to_learn);
  formData.append("pricing", draft.pricing);
  formData.append("amount", draft.pricing === "free" ? "0" : draft.amount);
  formData.append("type", "advanced");
  formData.append("modules_no", draft.modules_count);
  formData.append("lessons_no", draft.lessons_count);
  const coverImage = await resolveCoverImage(draft);
  if (coverImage) formData.append("image", coverImage);
  formData.append("is_draft", "0");

  formData.append("has_certificate", draft.has_certificate ? "1" : "0");

  if (draft.institution) formData.append("institution", draft.institution);
  if (draft.course_code) formData.append("course_code", draft.course_code);
  if (draft.expires_at) formData.append("expires_at", draft.expires_at);

  return formData;
};

/**
 * Publishing an advanced Spoylz is a chain of calls, not one request:
 *
 *   1. POST admin/spoils         → the spoil (multipart, cover image included)
 *   2. POST modules              → one per module, carrying the new spoil_id
 *   3. POST lessons              → all lessons of a module in one multipart call
 *   4. POST quiz + POST questions → module quizzes, then the pre/post quizzes
 *   5. POST certificates/template/spoil → the certificate picked in review
 *
 * A failure in step 2-4 is reported by that step's own hook and does not undo
 * the spoil, so the admin keeps what was already saved instead of losing
 * everything to one bad lesson.
 */
export const usePublishAdvancedSpoilMutation = () => {
  const queryClient = useQueryClient();
  const { createModule } = useCreateModuleMutation();
  const { createLessons } = useCreateLessonMutation();
  const { createQuiz } = useCreateQuizMutation();
  const { createSpoilTemplate } = useCreateSpoilTemplateMutation();

  const publishModule = async (
    module: AdvancedModuleDraft,
    spoilId: number | string,
  ) => {
    const moduleRes = await createModule({
      title: module.title,
      description: module.description,
      spoil_id: spoilId,
    });

    const moduleId = getCreatedModuleId(moduleRes);
    if (!moduleId) return;

    if (module.lessons.length > 0) {
      await createLessons({
        module_id: moduleId,
        lessons: module.lessons.map((lesson) => ({
          title: lesson.title,
          type: lesson.type,
          content: lesson.type === "text" ? lesson.content : undefined,
          file: lesson.content_file instanceof File ? lesson.content_file : null,
        })),
      });
    }

    if (module.quiz) {
      await createQuiz({
        quiz: module.quiz,
        type: "module",
        module_id: moduleId,
        spoil_id: spoilId,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: async ({ tutor_id, draft }: PublishAdvancedSpoilPayload) => {
      const res = await apiCall().post(
        "admin/spoils",
        await buildAdvancedFormData(tutor_id, draft),
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const spoilId = getCreatedSpoilId(res?.data);
      if (!spoilId) return res?.data;

      await attachCertificateToSpoil(
        createSpoilTemplate,
        spoilId,
        draft.has_certificate,
      );

      for (const module of draft.modules) {
        try {
          await publishModule(module, spoilId);
        } catch {
          // The module hooks toast their own errors; keep going so one bad
          // module doesn't stop the rest of the outline from being saved.
        }
      }

      if (draft.pre_quiz) {
        try {
          await createQuiz({
            quiz: draft.pre_quiz,
            type: "pre",
            spoil_id: spoilId,
          });
        } catch {
          // reported by useCreateQuizMutation
        }
      }

      if (draft.post_quiz) {
        try {
          await createQuiz({
            quiz: draft.post_quiz,
            type: "post",
            spoil_id: spoilId,
          });
        } catch {
          // reported by useCreateQuizMutation
        }
      }

      return res?.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
      return data;
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to publish Spoylz. Try again.",
      });
    },
  });

  return {
    publishAdvancedSpoil: mutation.mutateAsync,
    isPublishing: mutation.isPending,
  };
};
