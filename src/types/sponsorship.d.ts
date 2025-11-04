export interface SponsorshipsResponse {
  message: string;
  status: boolean;
  data: SponsorshipsData;
}

export interface SponsorshipsData {
  current_page: number;
  data: SponsorshipsDatum[];
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

export interface SponsorshipsDatum {
  sponsorship_id: number;
  sponsor_id: number;
  sponsor_name: string;
  sponsor_email: string;
  total_spoils_sponsored: number;
  total_learners_sponsored: number;
  total_amount: string;
  total_codes: number;
  total_redeemed: number;
}

interface SponsorshipDetailsResponse {
  message: string;
  status: boolean;
  data: SponsorshipDetailsData;
}

interface SponsorshipDetailsData {
  current_page: number;
  data: SponsorshipDetailsDatum[];
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

interface SponsorshipDetailsDatum {
  sponsorship_id: number;
  spoil_id: number;
  spoil_title: string;
  tutor_name: string;
  total_sponsored: number;
  total_amount: string;
  date_sponsored: string;
  status: string;
  total_codes: number;
  total_redeemed: number;
}

export interface AdminSponsorshipsResponse {
  message: string;
  status: boolean;
  data: AdminSponsorshipsData;
}

export interface AdminSponsorshipsData {
  current_page: number;
  data: AdminSponsorshipsDatum[];
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

export interface AdminSponsorshipsDatum {
  id: number;
  spoil_id: number;
  sponsor_id: number;
  is_admin: number;
  payment_id: null;
  unit_amount: string;
  quantity: number;
  total_amount: string;
  status: string;
  paid_at: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  total_codes: number;
  total_redeemed: number;
  spoil: Spoil;
  sponsor: Sponsor;
  codes: Code[];
}

interface Code {
  id: number;
  sponsorship_id: number;
  learner_id: null;
  code: string;
  redeemed_at: null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  learner: Learners;
}

interface Sponsor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile: null;
  total_spoils_created: null;
  followers_count: null;
}

interface Spoil {
  id: number;
  title: string;
  amount: number;
  modules_no: number;
  lessons_no: number;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: null;
  tutor: null;
}

interface Learners {
  id: number;
  first_name: string;
  last_name: string;
  profile: null;
  total_spoils_created: null;
  followers_count: null;
}