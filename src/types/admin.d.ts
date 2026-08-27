import type { UserDatum } from "./user";

/**
 * Body for `POST /admin/users`.
 *
 * The first five fields are the documented request body. `phone_number`,
 * `role` and `avatar` are on the Sub-Admin design but are not part of that
 * contract, so they are optional and only sent when actually filled in —
 * leaving them blank keeps the request exactly the documented shape.
 */
export interface CreateAdminUserPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number?: string;
  role?: string;
  avatar?: File;
}

/**
 * Body for `POST /users/:id` (with `_method: patch`). Every field is optional:
 * the edit form only sends what changed, and an empty `password` means "leave
 * the current one alone" rather than "clear it".
 */
export interface UpdateAdminUserPayload {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  role?: string;
  avatar?: File;
}

export interface CreateAdminUserResponse {
  message: string;
  status: boolean;
  data: UserDatum;
}

/**
 * Body for `PATCH /admin/users/:id` when marking a user verified. Only the
 * field being verified is sent, so the other one is never overwritten.
 */
export interface VerifyUserPayload {
  email_verified_at?: string;
  phone_verified_at?: string;
}

/**
 * Body for `PATCH /admin/users/:id` when enabling or disabling an account.
 * The API returns `is_active` as 1/0 but takes a real boolean here.
 */
export interface ToggleUserStatusPayload {
  is_active: boolean;
}
