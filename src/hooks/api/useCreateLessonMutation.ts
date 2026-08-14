import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import apiCall from "@spt/utils/apiCall";

export interface CreateLessonItem {
  title: string;
  type: string;
  /** Text lessons carry their body here. */
  content?: string;
  /** File lessons carry their upload here. */
  file?: File | null;
  description?: string;
}

export interface CreateLessonsPayload {
  module_id: number | string;
  lessons: CreateLessonItem[];
}

/**
 * All lessons of a module go up in a single multipart request as
 * `lessons[i][title]`, `lessons[i][type]`, `lessons[i][content]` (text) or
 * `lessons[i][file]` (file).
 */
const buildLessonsFormData = ({ module_id, lessons }: CreateLessonsPayload) => {
  const formData = new FormData();
  formData.append("module_id", String(module_id));

  lessons.forEach((lesson, index) => {
    formData.append(`lessons[${index}][title]`, lesson.title);
    formData.append(`lessons[${index}][type]`, lesson.type);
    formData.append(
      `lessons[${index}][description]`,
      lesson.description ?? "",
    );

    if (lesson.type === "text" && lesson.content) {
      formData.append(`lessons[${index}][content]`, lesson.content);
    }

    if (lesson.type !== "text" && lesson.file instanceof File) {
      formData.append(`lessons[${index}][file]`, lesson.file);
    }
  });

  return formData;
};

export const useCreateLessonMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateLessonsPayload) => {
      const res = await apiCall().post("lessons", buildLessonsFormData(payload), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spoils"] });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message || "Failed to add lesson. Try again.",
      });
    },
  });

  return {
    createLessons: mutation.mutateAsync,
    isCreatingLessons: mutation.isPending,
  };
};
