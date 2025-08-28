export interface QuizResponse {
  message: string;
  status: boolean;
  data: QuizData;
}

export interface QuizData {
  id: number;
  title: string;
  type: string;
  module_id: number;
  spoil_id: number;
  description: string;
  no_of_questions: number;
  time_limit: number;
  pass_mark: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  questions: Question[];
}

interface Question {
  id: number;
  quiz_id: number;
  type: string;
  question: string;
  options: null | string;
  answer: string;
  deleted_at: null;
  created_at: null;
  updated_at: null;
}