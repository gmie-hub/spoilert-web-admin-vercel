import type {
  RawReportPerson,
  RawTutorReport,
  ReportActionType,
  ReportedTutor,
} from "@spt/types/report";

import { asPerson, personName } from "../mapPerson";

/**
 * Maps the numeric `status` code to the display label. Only 0 (unreviewed) is
 * confirmed from the API so far — extend this map once the backend documents
 * the codes it sets when an admin bans a tutor / sends a message.
 */
const STATUS_TO_ACTION: Record<number, ReportActionType> = {
  0: "No Action Taken",
};

const actionFromStatus = (status?: number): ReportActionType =>
  (status != null && STATUS_TO_ACTION[status]) || "No Action Taken";

/**
 * Normalises a raw record from GET /reports?type=tutor into the ReportedTutor
 * shape the table renders. Field names are matched defensively (snake_case
 * Laravel relations with fallbacks) so partial API matches still populate.
 * Update the lookups here if the backend keys differ.
 */
export const mapTutorReport = (raw: RawTutorReport): ReportedTutor => {
  // The reported tutor is the reportable entity: `tutor`, falling back to
  // `reportable`.
  const tutorRaw = raw.tutor ?? raw.reportable ?? undefined;
  // Reporter/reviewer are only ids today (user_id / reviewed_by) — these
  // relations resolve to "—" until the backend expands them.
  const reporterRaw = raw.reporter ?? raw.reported_by ?? raw.user;
  const adminRaw = raw.admin ?? raw.handled_by ?? raw.reviewer;

  return {
    id: raw.id,
    tutor: asPerson(tutorRaw),
    reportedBy: asPerson(reporterRaw),
    reason: raw.reason ?? "—",
    description: raw.description ?? raw.message ?? "",
    dateReported: raw.created_at ?? raw.date_reported ?? "",
    actionTaken: actionFromStatus(raw.status),
    adminName:
      (typeof adminRaw === "string" ? adminRaw : undefined) ??
      (adminRaw ? personName(adminRaw as RawReportPerson) : undefined) ??
      raw.admin_note ??
      "—",
    timeline: [],
  };
};
