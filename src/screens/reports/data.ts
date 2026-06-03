import type {
  ReportActionType,
  ReportTimelineEntry,
  ReportedTutor,
} from "@spt/types/report";
import { reportReasons } from "@spt/utils/tableData";

const actionByReason: Record<string, ReportActionType> = {
  "Inappropriate Behavior": "Tutor Banned",
  "Fraud or Scam": "Tutor Banned",
  "Poor quality or misleading content": "Message sent to tutor",
  "Harassment or abuse": "Message sent to tutor",
  Spam: "Tutor Banned",
  Others: "Tutor Banned",
};

const descriptions: Record<string, string> = {
  "Inappropriate Behavior":
    "I experienced inappropriate behavior from this tutor. Their conduct during our chat was uncomfortable and not aligned with the expected standards of professionalism on this platform.",
  "Fraud or Scam":
    "This tutor asked me to pay outside the platform and never delivered the agreed sessions. I believe this is a clear case of fraud.",
  "Poor quality or misleading content":
    "The spoil content did not match the description at all. The material was outdated and misleading compared to what was advertised.",
  "Harassment or abuse":
    "The tutor repeatedly sent unsolicited messages and used abusive language when I declined to continue the session.",
  Spam: "This tutor keeps sending repetitive promotional messages and links that are unrelated to the course I enrolled in.",
  Others:
    "I would like to report a concern with this tutor's conduct that doesn't fall under the listed categories. Please review the chat history.",
};

const tutorNames = [
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

const reporterNames = [
  "Ogunsola Omorinsola",
  "Robert Fox",
  "Jane Cooper",
  "Theresa Webb",
  "Cameron Williamson",
  "Eleanor Pena",
  "Courtney Henry",
  "Annette Black",
  "Marvin McKinney",
  "Floyd Miles",
  "Devon Lane",
  "Jerome Bell",
  "Arlene McCoy",
  "Ronald Richards",
];

const bannedTutorTimeline: ReportTimelineEntry[] = [
  {
    id: 1,
    type: "ban",
    title: "Tutor Banned",
    description:
      "Tutor was banned for 7 days due to a violation of Spoilert's policies related to inappropriate or unprofessional conduct.",
    admin: "David Coker",
    date: "2026-05-18T08:14:00",
  },
  {
    id: 2,
    type: "message",
    title: "Message Sent",
    description: "Please refund affected learners within 72 hours.",
    admin: "Omorinsola Ogunsola",
    date: "2026-05-18T08:14:00",
  },
  {
    id: 3,
    type: "message",
    title: "Message Sent",
    description: "Kindly refrain from inappropriate communication with learners.",
    admin: "Tobi Johnson",
    date: "2026-05-18T08:14:00",
  },
];

const reviewedTutorTimeline: ReportTimelineEntry[] = [
  {
    id: 1,
    type: "message",
    title: "Message Sent",
    description:
      "We've received a report regarding the quality of your content. Please review our content guidelines and update the affected spoil.",
    admin: "Dunni Coker",
    date: "2026-04-13T10:24:00",
  },
];

export const reportedTutors: ReportedTutor[] = Array.from(
  { length: 24 },
  (_, index) => {
    const reason = reportReasons[index % reportReasons.length];
    const day = ((index % 27) + 1).toString().padStart(2, "0");

    return {
      id: index + 1,
      tutor: {
        id: 1000 + index,
        name: tutorNames[index % tutorNames.length],
      },
      reportedBy: {
        id: 2000 + index,
        name: reporterNames[index % reporterNames.length],
      },
      reason,
      description: descriptions[reason],
      dateReported: `2026-04-${day}`,
      actionTaken: actionByReason[reason],
      adminName: "Dunni Coker",
      timeline:
        index === 0
          ? bannedTutorTimeline
          : index === 2
            ? reviewedTutorTimeline
            : [],
    };
  }
);

export const getReportById = (id?: number | string) =>
  reportedTutors.find((report) => report.id === Number(id));
