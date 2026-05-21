export type PaymentType = "spoil" | "sponsored_spoil";

export interface PaymentsResponse {
  message: string;
  status: boolean;
  data: PaymentsData;
}

export interface PaymentsData {
  current_page: number;
  data: PaymentDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export interface PaymentDatum {
  id: number;
  reference: string;
  type: PaymentType;
  amount: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
