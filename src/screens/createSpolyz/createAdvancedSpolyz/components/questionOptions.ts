import { type QuizOptionDraft, createId } from "@spt/store/createSpolyzStore";

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 4;

export const createEmptyOption = (): QuizOptionDraft => ({
  id: createId(),
  text: "",
  is_correct: false,
});
