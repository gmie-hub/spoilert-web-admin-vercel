import { format, parseISO } from "date-fns";

// export const formatDate = (date?: string) => {
//   if (!date) return "N/A";
//   try {
//     const parsedDate = parseISO(date);
//     return format(parsedDate, "dd-MM-yyyy");
//   } catch (error) {
//     return "Invalid date";
//   }
// };

export const formatDate = (date?: string) => {
  if (!date) return "Invalid time";

  try {
    const parsedDate = parseISO(date);

    if (isNaN(parsedDate.getTime())) return "Invalid time";

    const hasTime = date.includes("T") || date.includes(" ");

    return format(
      parsedDate,
      hasTime ? "MMM d, yyyy h:mm a" : "MMM d, yyyy"
    );
  } catch (error) {
    return "Invalid time";
  }
};

/*************  ✨ Windsurf Command ⭐  *************/
/*******  6344c812-cd61-4331-83b8-ffb55d4ded23  *******/

export const formatTime = (date?: string) => {
  if (!date) return "Invalid time";
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "h:mm a");
  } catch (error) {
    return "Invalid time";
  }
};

export const formatDateTime = (date?: string) => {
  if (!date) return "N/A";
  return `${formatDate(date)} | ${formatTime(date)}`;
};

/**
 * Formats a date for timeline/activity entries, e.g. "May 18, 2026- 08:14 am".
 */
export const formatActionDate = (date?: string) => {
  if (!date) return "N/A";
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "MMM d, yyyy- hh:mm a")
      .replace("AM", "am")
      .replace("PM", "pm");
  } catch (error) {
    return "Invalid date";
  }
};


export const truncateText = (text: string | undefined, limit = 10): string => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};
/**
 * Timestamp the admin API accepts for the `*_verified_at` fields. The
 * documented payload is date-only ("2026-04-22"); if the backend wants the
 * time component too, widen this to "yyyy-MM-dd HH:mm:ss".
 */
export const nowForApi = () => format(new Date(), "yyyy-MM-dd");
