import { format, parseISO } from "date-fns";

export const formatDate = (date?: string) => {
  if (!date) return "Invalid date";
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
