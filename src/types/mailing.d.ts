export interface MailsResponse {
  message: string;
  status: boolean;
  data: MailsData;
}

export interface MailResponse {
  message: string;
  status: boolean;
  data: MailDatum;
}

export interface MailsData {
  current_page: number;
  data: MailDatum[];
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

export interface MailDatum {
  id: number;
  title: string;
  subject: string;
  body: string;
  /** Audience label, e.g. "All Users". */
  users?: string;
  created_at: string;
  updated_at: string;
}
