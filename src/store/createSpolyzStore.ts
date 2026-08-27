import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { UserDatum } from "@spt/types/user";

export type SpolyzType = "simple" | "advanced";
export type AdvancedStep = "basics" | "outline" | "review";

export interface SimpleSpolyzDraft {
  title: string;
  category_id: string;
  category_name: string;
  institution: string;
  course_code: string;
  pricing: string;
  amount: string;
  expires_at: string;
  description: string;
  what_to_learn: string;
  lesson_type: string;
  cover_image: File | null;
  cover_preview: string;
  content_file: File | null;
  lesson_content: string;
  has_certificate: boolean;
}

export type LessonType = "text" | "file";

export interface AdvancedLessonDraft {
  id: string;
  title: string;
  type: LessonType;
  content: string;
  content_file?: File | null;
}

export type QuizQuestionType = "multiple_choice" | "fill_in_the_blank";

export interface QuizOptionDraft {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface QuizQuestionDraft {
  id: string;
  prompt: string;
  type: QuizQuestionType;
  /** Only used by fill-in-the-blank questions. */
  answer: string;
  /** Only used by multiple-choice questions (2 - 4 options, exactly one correct). */
  options: QuizOptionDraft[];
}

/**
 * A quiz the admin builds locally before publishing. It maps onto the API's
 * quiz payload — `pre`/`post` quizzes hang off the spoil, module quizzes hang
 * off a module (see usePublishAdvancedSpoilMutation).
 */
export interface QuizDraft {
  title: string;
  description: string;
  no_of_questions: string;
  time_limit: string;
  /** Required for post-Spoylz quizzes only. */
  pass_mark: string;
  questions: QuizQuestionDraft[];
}

export interface AdvancedModuleDraft {
  id: string;
  title: string;
  description: string;
  lessons: AdvancedLessonDraft[];
  quiz: QuizDraft | null;
}

export interface AdvancedSpolyzDraft {
  title: string;
  category_id: string;
  category_name: string;
  institution: string;
  course_code: string;
  pricing: string;
  amount: string;
  expires_at: string;
  modules_count: string;
  lessons_count: string;
  description: string;
  what_to_learn: string;
  cover_image: File | null;
  cover_preview: string;
  has_certificate: boolean;
  modules: AdvancedModuleDraft[];
  pre_quiz: QuizDraft | null;
  post_quiz: QuizDraft | null;
}

export const createEmptyQuizDraft = (): QuizDraft => ({
  title: "",
  description: "",
  no_of_questions: "",
  time_limit: "",
  pass_mark: "",
  questions: [],
});

/**
 * A certificate template picked from GET certificates/template. `templateContent`
 * is the raw markup that gets previewed and, once the spoil exists, posted to
 * certificates/template/spoil.
 */
export interface CertificateTemplateSelection {
  id: string;
  code: string;
  name: string;
  templateContent: string;
  templateFileName: string | null;
}

interface CreateSpolyzState {
  selectedTutor: UserDatum | null;
  spolyzType: SpolyzType | null;
  simpleDraft: SimpleSpolyzDraft | null;
  advancedDraft: AdvancedSpolyzDraft | null;
  advancedStep: AdvancedStep;
  spoilId: number | null;
  certificateTemplate: CertificateTemplateSelection | null;
  setSelectedTutor: (tutor: UserDatum | null) => void;
  setSpolyzType: (type: SpolyzType | null) => void;
  setSimpleDraft: (draft: SimpleSpolyzDraft | null) => void;
  setAdvancedDraft: (draft: AdvancedSpolyzDraft | null) => void;
  setAdvancedStep: (step: AdvancedStep) => void;
  setSpoilId: (id: number | null) => void;
  setCertificateTemplate: (template: CertificateTemplateSelection | null) => void;
  setHasCertificate: (value: boolean) => void;
  setAdvancedHasCertificate: (value: boolean) => void;
  reset: () => void;
}

/**
 * Everything the persisted draft keeps. Files are dropped on the way into
 * storage: the cover image survives as the data URL in `cover_preview` and is
 * rebuilt before publishing, while lesson uploads are too large for local
 * storage and have to be re-attached after a reload.
 */
/**
 * Persisting must never break the form: an oversized cover image would blow
 * the storage quota, so a failed write just means the draft is not kept.
 */
const safeLocalStorage = {
  getItem: (name: string) => localStorage.getItem(name),
  setItem: (name: string, value: string) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // draft too large to keep
    }
  },
  removeItem: (name: string) => localStorage.removeItem(name),
};

type PersistedCreateSpolyzState = Pick<
  CreateSpolyzState,
  | "selectedTutor"
  | "spolyzType"
  | "simpleDraft"
  | "advancedDraft"
  | "advancedStep"
  | "spoilId"
  | "certificateTemplate"
>;

export const useCreateSpolyzStore = create<CreateSpolyzState>()(
  persist<CreateSpolyzState, [], [], PersistedCreateSpolyzState>(
    (set) => ({
      selectedTutor: null,
      spolyzType: null,
      simpleDraft: null,
      advancedDraft: null,
      advancedStep: "basics",
      spoilId: null,
      certificateTemplate: null,
      setSelectedTutor: (tutor) => set({ selectedTutor: tutor }),
      setSpolyzType: (type) => set({ spolyzType: type }),
      setSimpleDraft: (draft) => set({ simpleDraft: draft }),
      setAdvancedDraft: (draft) => set({ advancedDraft: draft }),
      setAdvancedStep: (step) => set({ advancedStep: step }),
      setSpoilId: (id) => set({ spoilId: id }),
      setCertificateTemplate: (template) => set({ certificateTemplate: template }),
      setHasCertificate: (value) =>
        set((state) => ({
          simpleDraft: state.simpleDraft
            ? { ...state.simpleDraft, has_certificate: value }
            : null,
        })),
      setAdvancedHasCertificate: (value) =>
        set((state) => ({
          advancedDraft: state.advancedDraft
            ? { ...state.advancedDraft, has_certificate: value }
            : null,
        })),
      reset: () =>
        set({
          selectedTutor: null,
          spolyzType: null,
          simpleDraft: null,
          advancedDraft: null,
          advancedStep: "basics",
          spoilId: null,
          certificateTemplate: null,
        }),
    }),
    {
      name: "spoilert-create-spolyz",
      storage: createJSONStorage(() => safeLocalStorage),
      partialize: (state) => ({
        selectedTutor: state.selectedTutor,
        spolyzType: state.spolyzType,
        advancedStep: state.advancedStep,
        spoilId: state.spoilId,
        certificateTemplate: state.certificateTemplate,
        simpleDraft: state.simpleDraft && {
          ...state.simpleDraft,
          cover_image: null,
          content_file: null,
        },
        advancedDraft: state.advancedDraft && {
          ...state.advancedDraft,
          cover_image: null,
          modules: state.advancedDraft.modules.map((module) => ({
            ...module,
            lessons: module.lessons.map((lesson) => ({
              ...lesson,
              content_file: null,
            })),
          })),
        },
      }),
    },
  ),
);

export const getTutorDisplayName = (tutor: UserDatum) =>
  `${tutor.first_name ?? ""} ${tutor.last_name ?? ""}`.trim() ||
  tutor.username ||
  tutor.email;

export const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
