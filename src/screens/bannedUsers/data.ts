import { addDays, format, parseISO } from "date-fns";

import type { BannedUser } from "@spt/types/bannedUser";

const names = [
  "Ralph Edwards",
  "Brooklyn Simmons",
  "Darlene Robertson",
  "Savannah Nguyen",
  "Dianne Russell",
  "Jenny Wilson",
  "Albert Flores",
  "Kristin Watson",
  "Cody Fisher",
  "Esther Howard",
  "Jacob Jones",
  "Leslie Alexander",
  "Guy Hawkins",
  "Wade Warren",
];

const timeframes = [
  "7 days",
  "30 Days",
  "90 Days",
  "10 days",
  "90 Days",
  "30 Days",
  "30 Days",
];

const reasons = [
  "This user was banned due to a violation of Spoilert's policies related to inappropriate or unprofessional conduct.",
  "This user repeatedly engaged in fraudulent activity and attempted to take payments outside the platform.",
  "This user was reported multiple times for harassment and abusive communication with learners.",
  "This user uploaded misleading and low-quality content that violated our content standards.",
  "This user was flagged for spamming learners with unsolicited promotional messages.",
];

export const bannedUsers: BannedUser[] = Array.from(
  { length: 24 },
  (_, index) => {
    const timeframe = timeframes[index % timeframes.length];
    const days = parseInt(timeframe, 10) || 30;
    const banStartDate = "2026-04-12";
    const banEndDate = format(
      addDays(parseISO(banStartDate), days),
      "yyyy-MM-dd"
    );

    return {
      id: index + 1,
      user: {
        id: 1000 + index,
        name: names[index % names.length],
      },
      timeframe,
      banStartDate,
      banEndDate,
      reason: reasons[index % reasons.length],
    };
  }
);

export const getBannedUserById = (id?: number | string) =>
  bannedUsers.find((user) => user.id === Number(id));
