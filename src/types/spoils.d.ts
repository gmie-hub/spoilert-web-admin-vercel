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

interface Module {
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