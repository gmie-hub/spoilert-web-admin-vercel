export interface SettingsResponse {
  message: string;
  status: boolean;
  data: SettingsData;
}

interface SettingsData {
  current_page: number;
  data: SettingsDatum[];
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

export interface SettingsDatum {
  id: number;
  name: string;
  slug: string;
  section: null | string;
  value: null | string;
  metadata: Metadatum[] | Metadata2[] | Metadata3[] | null;
  deleted_at: null;
  created_at: string;
  updated_at: string;
}

export interface Metadata3 {
  max: null | number;
  min: number;
  charge: number;
}

export interface Metadata2 {
  contact_email_id: string;
  contact_location: number;
  contact_phone_number: string;
}

export interface Metadatum {
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}

export interface SettingProps {
  data: SettingsDatum[];
}

// export const TRANSACTION = "transaction";