import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import type { SimpleSpolyzDraft } from "@spt/store/createSpolyzStore";
import apiCall from "@spt/utils/apiCall";
import { resolveCoverImage } from "@spt/utils/coverImage";

import {
  attachCertificateToSpoil,
  useCreateSpoilTemplateMutation,
} from "./useCreateSpoilTemplateMutation";

export interface PublishSpoilPayload {
  tutor_id: number;
  draft: SimpleSpolyzDraft;
}

const buildFormData = async (
  tutor_id: number,
  draft: SimpleSpolyzDraft,
  isDraft: boolean,
) => {
  const formData = new FormData();
  formData.append("tutor_id", String(tutor_id));
  formData.append("title", draft.title);
  formData.append("category_id", draft.category_id);
  formData.append("description", draft.description);
  formData.append("what_to_learn", draft.what_to_learn);
  formData.append("pricing", draft.pricing);
  formData.append("amount", draft.pricing === "free" ? "0" : draft.amount);
  formData.append("type", "simple");
  formData.append("lesson_type", draft.lesson_type);
  const coverImage = await resolveCoverImage(draft);
  if (coverImage) formData.append("image", coverImage);
  formData.append("is_draft", isDraft ? "1" : "0");

  if (draft.lesson_type === "text") {
    formData.append("lesson_content", draft.lesson_content);
  } else if (draft.content_file) {
    formData.append("lesson_file", draft.content_file);
  }

  formData.append("has_certificate", draft.has_certificate ? "1" : "0");

  if (draft.institution) formData.append("institution", draft.institution);
  if (draft.course_code) formData.append("course_code", draft.course_code);
  if (draft.expires_at) formData.append("expires_at", draft.expires_at);

  return formData;
};

export const usePublishSpoilMutation = () => {
  const queryClient = useQueryClient();
  const { createSpoilTemplate } = useCreateSpoilTemplateMutation();

  const mutation = useMutation({
    mutationFn: async ({ tutor_id, draft }: PublishSpoilPayload) => {
      const res = await apiCall().post(
        "admin/spoils",
        await buildFormData(tutor_id, draft, false),
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      const spoilId = res?.data?.data?.id ?? res?.data?.id ?? null;
      if (spoilId) {
        await attachCertificateToSpoil(
          createSpoilTemplate,
          spoilId,
          draft.has_certificate,
        );
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
    publishSpoil: mutation.mutateAsync,
    isPublishing: mutation.isPending,
  };
};
