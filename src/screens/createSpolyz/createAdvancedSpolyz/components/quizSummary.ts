import type { QuizDraft } from "@spt/store/createSpolyzStore";

/** e.g. "5 questions · 20 min" — used wherever a saved quiz is listed. */
export const formatQuizSummary = (quiz: QuizDraft) =>
  `${quiz.questions.length} question${
    quiz.questions.length === 1 ? "" : "s"
  } · ${quiz.time_limit} min`;
