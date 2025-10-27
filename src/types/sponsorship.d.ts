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

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

interface SponsorshipDetailsDatum {
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