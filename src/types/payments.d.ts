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
  user_id: number;
  tutor_id: number;
  spoil_id: number;
  promotion_package_id: number | null;
  type: PaymentType;
  gateway: string;
  reference: string;
  payment_url: string;
  amount: string;
  net_amount: string;
  tax_amount: string;
  charge: string;
  currency: string;
  status: string;
  paid_at: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
