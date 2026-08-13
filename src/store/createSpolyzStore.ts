import { create } from "zustand";

import type { UserDatum } from "@spt/types/user";

export type SpolyzType = "simple" | "advanced";

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
  cover_image: File;
  cover_preview: string;
  content_file: File;
  has_certificate: boolean;
}

interface CreateSpolyzState {
  selectedTutor: UserDatum | null;
  spolyzType: SpolyzType | null;
  simpleDraft: SimpleSpolyzDraft | null;
  spoilId: number | null;
  setSelectedTutor: (tutor: UserDatum | null) => void;
  setSpolyzType: (type: SpolyzType | null) => void;
  setSimpleDraft: (draft: SimpleSpolyzDraft | null) => void;
  setSpoilId: (id: number | null) => void;
  setHasCertificate: (value: boolean) => void;
  reset: () => void;
}

export const useCreateSpolyzStore = create<CreateSpolyzState>((set) => ({
  selectedTutor: null,
  spolyzType: null,
  simpleDraft: null,
  spoilId: null,
  setSelectedTutor: (tutor) => set({ selectedTutor: tutor }),
  setSpolyzType: (type) => set({ spolyzType: type }),
  setSimpleDraft: (draft) => set({ simpleDraft: draft }),
  setSpoilId: (id) => set({ spoilId: id }),
  setHasCertificate: (value) =>
    set((state) => ({
      simpleDraft: state.simpleDraft
        ? { ...state.simpleDraft, has_certificate: value }
        : null,
    })),
  reset: () =>
    set({
      selectedTutor: null,
      spolyzType: null,
      simpleDraft: null,
      spoilId: null,
    }),
}));

export const getTutorDisplayName = (tutor: UserDatum) =>
  `${tutor.first_name ?? ""} ${tutor.last_name ?? ""}`.trim() ||
  tutor.username ||
  tutor.email;
