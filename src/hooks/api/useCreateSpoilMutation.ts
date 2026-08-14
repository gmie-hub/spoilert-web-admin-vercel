import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface CreateSpoilPayload {
  tutor_id: number;
  title: string;
  category_id: string;
  description: string;
  what_to_learn: string;
  pricing: string;
  amount: string;
  institution?: string;
  course_code?: string;
  expires_at?: string;
  lesson_type: string;
  cover_image: File;
  content_file: File | null;
  lesson_content: string;
  type: "simple" | "advanced";
}

export const useCreateSpoilMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateSpoilPayload) => {
      const formData = new FormData();
      formData.append("tutor_id", String(data.tutor_id));
      formData.append("title", data.title);
      formData.append("category_id", data.category_id);
      formData.append("description", data.description);
      formData.append("what_to_learn", data.what_to_learn);
      formData.append("pricing", data.pricing);
      formData.append("amount", data.pricing === "free" ? "0" : data.amount);
      formData.append("type", data.type);
      formData.append("lesson_type", data.lesson_type);
      formData.append("image", data.cover_image);
      formData.append("is_draft", "1");

      if (data.lesson_type === "text") {
        formData.append("lesson_content", data.lesson_content);
      } else if (data.content_file) {
        formData.append("lesson_file", data.content_file);
      }

      if (data.institution) formData.append("institution", data.institution);
      if (data.course_code) formData.append("course_code", data.course_code);
      if (data.expires_at) formData.append("expires_at", data.expires_at);

      const res = await apiCall().post("admin/spoils", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    },
    onSuccess: (data) => {
      toaster.create({
        type: "success",
        description: data?.message || "Spoil saved successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to create spoil. Try again.",
      });
    },
  });

  return {
    createSpoil: mutation.mutateAsync,
    isCreating: mutation.isPending,
  };
};
