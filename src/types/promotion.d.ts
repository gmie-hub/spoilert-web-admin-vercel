export interface PromotionPackage {
  id: number;
  name: string;
  duration: number | string;
  amount: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePromotionPackagePayload {
  name: string;
  duration: number;
  amount: number;
}

export interface CreatePromotionPackageResponse {
  message: string;
  status: boolean;
  data: PromotionPackage;
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

export interface PromotionTutor {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
}

export interface PromotionSpoil {
  id: number;
  title: string;
  slug?: string;
  type?: string;
  cover_image_url?: string | null;
  category_id?: number;
  tutor_id?: number;
  tutor?: PromotionTutor | null;
}

export interface Promotion {
  id: number;
  spoil_id: number;
  user_id: number;
  promotion_package_id: number;
  amount: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  spoil?: PromotionSpoil | null;
}

export interface PromotionsResponse {
  message: string;
  status: boolean;
  data: PromotionsData;
}

export interface PromotionsData {
  current_page: number;
  data: Promotion[];
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
