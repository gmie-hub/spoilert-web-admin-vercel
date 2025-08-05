export interface VerificationResponse {
  message: string;
  status: boolean;
  data: VerificationData;
}

interface VerificationData {
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
  user_id: number;
  type: string;
  url: string;
  value: string;
  status: number;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}