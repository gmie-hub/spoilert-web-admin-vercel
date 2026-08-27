export interface CmsResponse {
  message: string;
  status: boolean;
  data: CmsData;
}

export interface CmsDetailsResponse {
  message: string;
  status: boolean;
  data: CmsDatum;
}

export interface CmsData {
  current_page: number;
  data: CmsDatum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export interface CmsDatum {
  id: number;
  title: string;
  slug: string;
  /** Page body as HTML, authored in the rich text editor. */
  description: string;
  created_at: string;
  updated_at: string;
}
