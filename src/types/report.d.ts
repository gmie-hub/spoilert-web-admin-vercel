export type ReportType = "spoil" | "tutor";

/**
 * Generic wrapper for the GET /reports endpoint.
 * `data` is typed loosely for now — tighten it once the real response
 * shape is known.
 */
export interface ReportsApiResponse<T = unknown> {
  message: string;
  status: boolean;
  data: T;
}

export type ReportActionType =
  | "Tutor Banned"
  | "Message sent to tutor"
  | "No Action Taken";

export type ReportTimelineType = "message" | "ban" | "note";

export interface ReportPerson {
  id: number;
  name: string;
  avatar?: string;
}

export interface ReportTimelineEntry {
  id: number;
  type: ReportTimelineType;
  title: string;
  description?: string;
  admin: string;
  /** ISO date string */
  date: string;
}

export interface ReportedTutor {
  id: number;
  tutor: ReportPerson;
  reportedBy: ReportPerson;
  reason: string;
  description: string;
  /** ISO date string */
  dateReported: string;
  actionTaken: ReportActionType;
  adminName: string;
  timeline: ReportTimelineEntry[];
}

export type SpoilReportActionType =
  | "Spoylz Disabled"
  | "Message sent to tutor"
  | "No Action Taken";

export interface ReportSpoil {
  id: number;
  title: string;
  thumbnail?: string;
}

export interface ReportedSpoil {
  id: number;
  spoil: ReportSpoil;
  tutor: ReportPerson;
  reportedBy: ReportPerson;
  reason: string;
  description: string;
  /** ISO date string */
  dateReported: string;
  actionTaken: SpoilReportActionType;
  adminName: string;
  timeline: ReportTimelineEntry[];
}

/** Laravel-style paginated payload wrapped by ReportsApiResponse.data. */
export interface Paginated<T> {
  current_page: number;
  data: T[];
  total: number;
  per_page: number;
  last_page: number;
}

/** Nested `profile` object on a report person (not an avatar string). */
export interface RawReportProfile {
  id?: number;
  user_id?: number;
  bio?: string | null;
  avatar?: string | null;
  [key: string]: unknown;
}

/**
 * Raw person/relation as returned by the reports API (e.g. `spoil.tutor`).
 * Kept permissive so the normaliser (mapSpoilReport) can fall back across
 * likely key names.
 */
export interface RawReportPerson {
  id?: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  display_name?: string | null;
  username?: string;
  email?: string;
  avatar?: string | null;
  profile?: RawReportProfile | null;
}

/** Raw spoil relation attached to a report. */
export interface RawReportSpoil {
  id?: number;
  title?: string;
  thumbnail?: string | null;
  cover_image_url?: string | null;
  tutor?: RawReportPerson;
}

/**
 * Raw record from GET /reports?type=spoil. This is the report row itself, not
 * the spoil — the reported spoil hangs off `spoil` (and its tutor off
 * `spoil.tutor`). `reporter`/`user` and `reviewer` are only present if the
 * backend expands those relations; today only `user_id`/`reviewed_by` ids come
 * back, so mapSpoilReport falls back to "—".
 */
export interface RawSpoilReport {
  id: number;
  user_id?: number;
  reportable_type?: ReportType;
  reportable_id?: number;
  reason?: string | null;
  description?: string | null;
  message?: string | null;
  /** Numeric status code (0 = unreviewed). */
  status?: number;
  reviewed_by?: number | null;
  reviewed_at?: string | null;
  admin_note?: string | null;
  meta?: unknown;
  created_at?: string;
  updated_at?: string;
  date_reported?: string;
  spoil?: RawReportSpoil;
  reportable?: RawReportSpoil;
  tutor?: RawReportPerson | null;
  reporter?: RawReportPerson;
  reported_by?: RawReportPerson;
  user?: RawReportPerson;
  reviewer?: RawReportPerson;
  admin?: RawReportPerson | string;
  handled_by?: RawReportPerson | string;
}

/**
 * Raw record from GET /reports?type=tutor. Here the reported entity is the
 * tutor itself, so it hangs off `tutor` (with `reportable` as a fallback).
 * Reporter/reviewer relations resolve to "—" until the backend expands them.
 */
export interface RawTutorReport {
  id: number;
  user_id?: number;
  reportable_type?: ReportType;
  reportable_id?: number;
  reason?: string | null;
  description?: string | null;
  message?: string | null;
  /** Numeric status code (0 = unreviewed). */
  status?: number;
  reviewed_by?: number | null;
  reviewed_at?: string | null;
  admin_note?: string | null;
  meta?: unknown;
  created_at?: string;
  updated_at?: string;
  date_reported?: string;
  /** The reported tutor. */
  tutor?: RawReportPerson | null;
  reportable?: RawReportPerson;
  reporter?: RawReportPerson;
  reported_by?: RawReportPerson;
  user?: RawReportPerson;
  reviewer?: RawReportPerson;
  admin?: RawReportPerson | string;
  handled_by?: RawReportPerson | string;
}
