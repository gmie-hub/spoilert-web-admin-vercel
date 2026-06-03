import type {
  ReportTimelineEntry,
  ReportedSpoil,
  SpoilReportActionType,
} from "@spt/types/report";
import { spoilReportReasons } from "@spt/utils/tableData";

const actionByReason: Record<string, SpoilReportActionType> = {
  "Copyright Violation": "Spoylz Disabled",
  "Fraud or Scam": "Spoylz Disabled",
  "Poor quality or misleading content": "Spoylz Disabled",
  Spam: "Spoylz Disabled",
  Others: "Message sent to tutor",
};

const descriptions: Record<string, string> = {
  "Copyright Violation":
    "I believe this spoil contains content that does not belong to the tutor or Spoilert. Some of the materials appear to be copied from external sources without proper permission or credit. Parts of the lessons and resources look identical to content I have seen elsewhere online. Please review this spoil for possible copyright infringement.",
  "Fraud or Scam":
    "This spoil promises outcomes it clearly cannot deliver and pushes learners to pay outside the platform. It looks like a scam designed to take advantage of learners.",
  "Poor quality or misleading content":
    "The spoil content does not match its description. The lessons are incomplete and the material is misleading compared to what was advertised on the listing.",
  Spam: "This spoil is filled with repetitive promotional links and content that is unrelated to the topic it claims to teach.",
  Others:
    "I'd like to flag a concern about this spoil that doesn't fall under the listed categories. Please review the lessons and resources attached to it.",
};

const spoilTitles = [
  "Understanding Design Principles",
  "Frontend Development",
  "CHM202- IUPAC Nomenclature",
  "Financial Literacy",
  "BCH 404- Pharmacology",
  "Enterpreneurship",
  "Backend Development",
  "Intro to Data Analysis",
  "Digital Marketing 101",
  "Public Speaking Mastery",
  "Mobile App Design",
  "Creative Writing",
  "Project Management",
  "Photography Basics",
];

const tutorNames = [
  "Tayo Adebanjo",
  "Ogunsola Omorinsola",
  "Esther Coker",
  "Adeyemi John",
  "Ogunsola Omorinsola",
  "Chioma Davies",
  "Oluwatimilehin Akinfemi",
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

const disabledSpoilTimeline: ReportTimelineEntry[] = [
  {
    id: 1,
    type: "ban",
    title: "Spoylz Disabled",
    description:
      "This spoil was disabled due to a violation of Spoilert's content policies related to copyright or misleading material.",
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
    description:
      "Kindly remove any copyrighted material and resubmit the spoil for review.",
    admin: "Tobi Johnson",
    date: "2026-05-18T08:14:00",
  },
];

export const reportedSpoils: ReportedSpoil[] = Array.from(
  { length: 24 },
  (_, index) => {
    const reason = spoilReportReasons[index % spoilReportReasons.length];
    const day = ((index % 27) + 1).toString().padStart(2, "0");

    return {
      id: index + 1,
      spoil: {
        id: 3000 + index,
        title: spoilTitles[index % spoilTitles.length],
        thumbnail: "/spoil-image.png",
      },
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
      timeline: index === 0 ? disabledSpoilTimeline : [],
    };
  }
);

export const getReportedSpoilById = (id?: number | string) =>
  reportedSpoils.find((report) => report.id === Number(id));
