export type QuizVariant = "pre" | "post" | "module";

export type QuizStep = "overview" | "questions" | "review";

export const quizPageTitles: Record<QuizVariant, string> = {
  pre: "Create Pre-Spoylz Quiz",
  post: "Create Post-Spoylz Quiz",
  module: "Create Module Quiz",
};

export const quizProgressTitles: Record<QuizVariant, string> = {
  pre: "Pre-Spoylz Progress",
  post: "Post-Spoylz Progress",
  module: "Module Quiz Progress",
};

export const quizReviewTitles: Record<QuizVariant, string> = {
  pre: "Pre-Spoylz Quiz Review",
  post: "Post-Spoylz Quiz Review",
  module: "Module Quiz Review",
};
