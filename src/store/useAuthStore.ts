// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface User {
//   id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   role: string;
//   username: string;
// }

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   setAuth: (data: { user: User; token: string }) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       token: null,
//       setAuth: ({ user, token }) => set({ user, token }),
//       logout: () => set({ user: null, token: null }),
//     }),
//     {
//       name: "auth-storage", // localStorage key
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

// =============================
// INTERFACES
// =============================

interface Profile {
  id: number;
  user_id: number;
  bio: string | null;
  payout_type: string | null;
  sub_account_id: string | null;
  certifications: string | null;
  expertise: string | null;
  experience: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface Tutor {
  id: number;
  user_id: number;
  bio: string | null;
  payout_type: string | null;
  sub_account_id: string | null;
  certifications: string | null;
  expertise: string | null;
  experience: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface User {
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
  last_login: string | null;
  is_password_changed: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  profile?: Profile;
  tutor?: Tutor;
  total_spoils_created: number;
  followers_count: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (data: { user: User; token: string }) => void;
  logout: () => void;
}

// =============================
// ZUSTAND STORE
// =============================

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: ({ user, token }) => set({ user, token }),

      // logout: () => set({ user: null, token: null }),
      logout: () => {
        set({ user: null, token: null });
        // clear persisted localStorage
        localStorage.removeItem("auth-storage"); // <-- match the 'name' you used in persist
      },
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);
