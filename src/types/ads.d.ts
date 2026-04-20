export interface Ad {
  id: number;
  title: string;
  url: string;
  category_id: number;
  category: string | null;
  clicks: number;
  image_url: string;
  size: string;
  start_date: string;
  end_date: string;
  status: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdsResponse {
  data: {
    data: Ad[];
    // Add pagination/meta fields if present in your API response
  };
}
