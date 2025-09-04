export interface CategoriesResponse {
  message: string;
  status: boolean;
  data: CategoriesData;
}

interface CategoriesData {
  current_page: number;
  data: CategoryDatum[];
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

export interface CategoryDetailsResponse {
  message: string;
  status: boolean;
  data: CategoryDatum;
}

export interface CategoryDatum {
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