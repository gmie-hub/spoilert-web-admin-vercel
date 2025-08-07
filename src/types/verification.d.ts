export interface VerificationsResponse {
  message: string;
  status: boolean;
  data: VerificationsData;
}

interface VerificationsData {
  current_page: number;
  data: VerificationDatum[];
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

export interface VerificationDatum {
  id: number;
  user: User;
  user_id: number;
  type: string;
  url: string;
  value: string;
  status: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}

export interface VerificationResponse {
  message: string;
  status: boolean;
  data: VerificationData;
}

interface VerificationData {
  id: number;
  user: User;
  user_id: number;
  type: string;
  url: string;
  value: string;
  status: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}

interface User {
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
