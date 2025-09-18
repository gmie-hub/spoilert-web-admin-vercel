export interface UserDatum {
  last_login:string;
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  middie_name: string | null;
  country: string;
  country_code: string;
  preferred_currency: string;
  phone_number: string;
  avatar: string | null;
  role: string;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  kyc_verified_at: string | null;
  is_active: number;
  is_password_changed: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  profile: any | null; 
  wallet:WalletDatum
  total_spoils_created:number;
  followers_count:number;

}


export interface WalletDatum {
  id: number;
  user_id: number;
  balance: string; // because "0.00" came as a string
  created_at: string; // ISO datetime string
  updated_at: string;
  deleted_at: string | null;
}
export interface UserData {
  current_page: number;
  data: UserDatum[];
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

export interface UserResponse {
  message: string;
  status: boolean;
  data: UserData;
}

export interface UserDetailsResponse {
  message: string;
  status: boolean;
  data: UserDatum;
}
