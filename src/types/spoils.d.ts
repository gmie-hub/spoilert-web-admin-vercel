export interface SpoilsResponse {
  message: string;
  status: boolean;
  data: SpoilsData;
}

interface SpoilsData {
  current_page: number;
  data: SpoilsDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

export interface SpoilsDatum {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  tutor_id: number;
  description: string;
  cover_image_url: string;
  pricing: string;
  amount: number;
  institution: string;
  course_code: null;
  modules_no: number;
  lessons_no: number;
  what_to_tearn: string;
  status: number;
  is_draft: boolean;
  premiere_at: null;
  expires_at: string;
  is_institution: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  category: Category;
  tutor: Tutor;
}

interface Tutor {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  middie_name: null;
  country_code: string;
  phone_number: string;
  avatar: null;
  role: string;
  email_verified_at: string;
  phone_verified_at: string;
  kyc_verified_at: string;
  is_active: number;
  is_password_changed: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  profile: null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: null;
  url: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  total_spoils: number;
}

interface CategoryData {
  current_page: number;
  data: Category[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}
export interface CategoryResponse {
  message: string;
  status: boolean;
  data: CategoryData;
}

export interface SpoilReview {
  id: number;
  spoil_id: number;
  user_id: number;
  rating: number;
  comment?: string;
  deleted_at?: string;
  created_at: string;
  updated_at: string;
  spoil?: null;
  user:user
}
export interface user{
email: string;
first_name: string;
id: number;
last_name: string;
profile: string;
}


interface SpoilReviewData {
  current_page: number;
  data: SpoilReview[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface SpoilReviewResponse {
  message: string;
  status: boolean;
  data: SpoilReviewData;
}


export interface SpoilResponse {
  message: string;
  status: boolean;
  data: SpoilData;
}

export interface SpoilData {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  tutor_id: number;
  description: string;
  cover_image_url: string;
  pricing: string;
  amount: number;
  institution: string;
  course_code: null;
  modules_no: number;
  lessons_no: number;
  what_to_tearn: string;
  status: number;
  is_draft: boolean;
  premiere_at: null;
  expires_at: string;
  is_institution: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  percentage_completed: number;
  related_spoils: Relatedspoil[];
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  category: Category;
  tutor: Tutor;
  modules: Module[];
}

export interface Module {
  id: number;
  title: string;
  slug: string;
  description: null;
  spoil_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  status: string;
  percentage_completed: number;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  slug: string;
  type: string;
  content: string;
  content_url: null;
  spoil_id: number;
  module_id: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  status: string;
}

interface Relatedspoil {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  cover_image_url: string;
  description: string;
  amount: number;
  modules_no: number;
  lessons_no: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  category: Category;
  tutor: null;
}
