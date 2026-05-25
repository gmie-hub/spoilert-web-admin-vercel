export interface PromotionPackage {
  id: number;
  name: string;
  duration: number | string;
  amount: string;
  created_at: string;
  updated_at: string;
}

export interface PromotionPackagesResponse {
  message: string;
  status: boolean;
  data: PromotionPackagesData;
}

export interface PromotionPackagesData {
  current_page: number;
  data: PromotionPackage[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PromotionPackagesLink[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

interface PromotionPackagesLink {
  url: null | string;
  label: string;
  active: boolean;
}
