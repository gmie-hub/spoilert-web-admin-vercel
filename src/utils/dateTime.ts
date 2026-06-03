import { format, parseISO } from "date-fns";

export const formatDate = (date?: string) => {
  if (!date) return "N/A";
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "dd-MM-yyyy");
  } catch (error) {
    return "Invalid date";
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