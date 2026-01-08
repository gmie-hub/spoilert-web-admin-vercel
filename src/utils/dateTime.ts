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

export const formatTime = (date?: string) => {
  if (!date) return "Invalid time";
  try {
    const parsedDate = parseISO(date);
    return format(parsedDate, "h:mm a");
  } catch (error) {
    return "Invalid time";
  }
};


export const truncateText = (text: string | undefined, limit = 10): string => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};