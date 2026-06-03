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
