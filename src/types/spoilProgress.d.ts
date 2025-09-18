import type { Module, Relatedspoil } from "./spoils";

// Root response
export interface SpoilProgressResponse {
    message: string;
    status: boolean;
    data: Spoil;
  }
  
  // Main spoil / course object
  export interface Spoil {
    id: number;
    title: string;
    slug: string;
    category_id: number | null;
    tutor_id: number | null;
    description: string | null;
    cover_image_url: string | null;
    pricing: string | null;
    amount: number | null;
    institution: string | null;
    course_code: string | null;
    modules_no: number;
    lessons_no: number;
    what_to_tearn?: string | null; // original has typo; keep optional if needed
    is_active: number;
    status: number;
    is_draft: boolean;
    premiere_at: string | null; // ISO date string
    expires_at: string | null;  // ISO date string
    is_institution: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    percentage_completed: number;
    total_modules_completed: number;
    total_modules_pending: number;
    current_module: number | null;
    current_lesson: number | null;
    learner_spoil: LearnerSpoil | null;
    pre_spoil_quiz: QuizSummary | null;
    post_spoil_quiz: QuizSummary | null;
    related_spoils: Relatedspoil[];
    average_rating: number;
    ratings_count: number;
    enrolled_users: number;
    is_enrolled: boolean;
    likes_count: number;
    shares_count: number;
    is_liked_by_current_user: boolean;
    category: any | null;
    tutor: Tutor | null;
    modules: Module[]; // refine if you have module shape
  }
  
  // Learner-specific progress info
  export interface LearnerSpoil {
    date_enrolled: string;
    status: string;
    progress_percentage: string; // e.g. "0.00"
  }
  
  // Quiz summary for pre/post quizzes
  export interface QuizSummary {
    highest_score: number | null;
    attempts: number;
  }
  
 
  // Tutor / creator info
  export interface Tutor {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    country: string | null;
    avatar: string | null;
    profile: string | null;
    total_spoils_created: number | null;
    followers_count: number | null;
  }
  
  export interface  LearnerSpoilOverviewDatum{
    total_spoils_enrolled: number;
    total_ongoing_spoils: number;
    total_completed_spoils: number;
}


export interface LearnerSpoilOverviewResponse {
  message: string;
  status: boolean;
  data: LearnerSpoilOverviewDatum;
}