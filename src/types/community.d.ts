export interface CommunitiesResponse {
  message: string;
  status: boolean;
  data: CommunitiesData;
}

export interface CommunityResponse {
  message: string;
  status: boolean;
  data: CommunitiesDatum;
}

export interface CommunitiesData {
  current_page: number;
  data: CommunitiesDatum[];
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

export interface CommunitiesDatum {
  id: number;
  name: string;
  owner_id: number;
  spoil_id: number;
  description: null;
  locked: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  is_free: boolean;
  has_joined: boolean;
  total_members: number;
  spoil: Spoil | Spoil2 | Spoil3 | Spoil4 | null;
}

interface Spoil4 {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  tutor_id: number;
  description: string;
  cover_image_url: string;
  pricing: string;
  amount: null;
  institution: null;
  course_code: null;
  modules_no: number;
  lessons_no: number;
  what_to_tearn: string;
  is_active: number;
  status: number;
  is_draft: boolean;
  premiere_at: string;
  expires_at: string;
  is_institution: number;
  has_certificate: number;
  certificate_fee: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: null;
  tutor: Tutor;
}

interface Spoil3 {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  tutor_id: number;
  description: string;
  cover_image_url: string;
  pricing: string;
  amount: null;
  institution: string;
  course_code: null;
  modules_no: number;
  lessons_no: number;
  what_to_tearn: string;
  is_active: number;
  status: number;
  is_draft: boolean;
  premiere_at: null;
  expires_at: string;
  is_institution: number;
  has_certificate: number;
  certificate_fee: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: Category;
  tutor: Tutor;
}

interface Spoil2 {
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
  is_active: number;
  status: number;
  is_draft: boolean;
  premiere_at: null;
  expires_at: string;
  is_institution: number;
  has_certificate: number;
  certificate_fee: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: Category;
  tutor: Tutor;
}

interface Spoil {
  id: number;
  title: string;
  slug: string;
  category_id: number;
  tutor_id: number;
  description: string;
  cover_image_url: string;
  pricing: string;
  amount: null;
  institution: null;
  course_code: null;
  modules_no: number;
  lessons_no: number;
  what_to_tearn: string;
  is_active: number;
  status: number;
  is_draft: boolean;
  premiere_at: null;
  expires_at: string;
  is_institution: number;
  has_certificate: number;
  certificate_fee: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: Category;
  tutor: Tutor;
}

interface Tutor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  avatar: null;
  profile: null;
  total_spoils_created: null;
  followers_count: null;
}

interface Category {
  id: number;
  name: string;
  description: null;
  url: string;
  total_spoils: number;
}

interface CommunityPostResponse {
  message: string;
  status: boolean;
  data: CommunityPostData;
}

interface CommunityPostData {
  current_page: number;
  data: CommunityPostDatum[];
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

interface CommunityPostDatum {
  id: number;
  community_id: number;
  user_id: number;
  content: null | string;
  images: any[];
  created_at: string;
  updated_at: string;
  deleted_at: null;
  total_likes: number;
  total_comments: number;
  has_liked: boolean;
}

interface CommentResponse {
  message: string;
  status: boolean;
  data: CommentData;
}

interface CommentData {
  current_page: number;
  data: CommentDatum[];
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

interface CommentDatum {
  id: number;
  post_id: number;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface CommunityUserResponse {
  message: string;
  status: boolean;
  data: CommunityUserData;
}

interface CommunityUserData {
  current_page: number;
  data: CommunityUserDatum[];
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

interface CommunityUserDatum {
  id: number;
  user_id: number;
  spoil_id: number;
  community_id: number;
  type: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: null;
  total_spoils_created: null;
  followers_count: null;
}