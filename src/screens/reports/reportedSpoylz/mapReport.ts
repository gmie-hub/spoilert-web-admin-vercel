import type {
  RawReportPerson,
  RawReportSpoil,
  RawSpoilReport,
  ReportedSpoil,
  SpoilReportActionType,
} from "@spt/types/report";

import { asPerson, personName } from "../mapPerson";

/**
 * Maps the numeric `status` code to the display label. Only 0 (unreviewed) is
 * confirmed from the API so far — extend this map once the backend documents
 * the codes it sets when an admin disables a spoil / messages a tutor.
 */
const STATUS_TO_ACTION: Record<number, SpoilReportActionType> = {
  0: "No Action Taken",
};

const actionFromStatus = (status?: number): SpoilReportActionType =>
  (status != null && STATUS_TO_ACTION[status]) || "No Action Taken";

/**
 * Normalises a raw record from GET /reports?type=spoil into the ReportedSpoil
 * shape the table renders. Field names are matched defensively (snake_case
 * Laravel relations with fallbacks) so partial API matches still populate.
 * Update the lookups here if the backend keys differ.
 */
export const mapSpoilReport = (raw: RawSpoilReport): ReportedSpoil => {
  const spoil: RawReportSpoil = raw.spoil ?? raw.reportable ?? {};
  // Spoil reports carry the tutor under `spoil.tutor`; top-level `tutor` is null.
  const tutorRaw = raw.tutor ?? spoil.tutor ?? undefined;
  // Reporter/reviewer are only ids today (user_id / reviewed_by) — these
  // relations resolve to "—" until the backend expands them.
  const reporterRaw = raw.reporter ?? raw.reported_by ?? raw.user;
  const adminRaw = raw.admin ?? raw.handled_by ?? raw.reviewer;

  return {
    id: raw.id,
    spoil: {
      id: spoil.id ?? 0,
      title: spoil.title ?? "—",
      thumbnail: spoil.cover_image_url ?? spoil.thumbnail ?? undefined,
    },
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
