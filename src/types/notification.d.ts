export interface NotificationsResponse {
  message: string;
  status: boolean;
  data: NotificationsData;
}

export interface NotificationResponse {
  message: string;
  status: boolean;
  data: NotificationDatum;
}

export interface NotificationsData {
  current_page: number;
  data: NotificationDatum[];
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

export interface NotificationUser {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  avatar?: null | string;
}

export interface NotificationDatum {
  id: number;
  title: string;
  type: string;
  body: string;
  created_at: string;
  updated_at: string;
  users?: NotificationUser[];
}
