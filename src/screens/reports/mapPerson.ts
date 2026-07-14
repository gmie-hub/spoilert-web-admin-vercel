import type { RawReportPerson, ReportPerson } from "@spt/types/report";

/** Best-effort display name across the person key shapes the API may return. */
export const personName = (person?: RawReportPerson): string => {
  if (!person) return "—";
  if (person.name) return person.name;
  if (person.display_name) return person.display_name;
  const fullName = [person.first_name, person.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || person.username || person.email || "—";
};

export const personAvatar = (person?: RawReportPerson): string | undefined =>
  person?.avatar || person?.profile?.avatar || undefined;

export const asPerson = (person?: RawReportPerson): ReportPerson => ({
  id: person?.id ?? 0,
  name: personName(person),
  avatar: personAvatar(person),
});
