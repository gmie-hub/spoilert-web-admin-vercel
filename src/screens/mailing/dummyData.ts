import type { MailDatum } from "@spt/types/mailing";

/**
 * Fallback data shown when the `/mails` endpoint returns nothing (e.g. while
 * the backend is still being wired up).
 */
export const DUMMY_MAILS: MailDatum[] = [
  {
    id: 1,
    title: "Welcome Email",
    subject: "Welcome",
    body: "We have new spoils uploaded on the app for you to be able to improve your skills",
    users: "All Users",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 2,
    title: "Customer Signup",
    subject: "General",
    body: "Thanks for signing up to Spoilert. Explore spoils tailored to your interests.",
    users: "All Learners",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 3,
    title: "Marketing Email",
    subject: "General",
    body: "Don't miss our latest promotions and featured spoils this week.",
    users: "All Users",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 4,
    title: "Customer Signup",
    subject: "General",
    body: "Thanks for signing up to Spoilert. Explore spoils tailored to your interests.",
    users: "All Tutors",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 5,
    title: "Welcome Email",
    subject: "Welcome",
    body: "We have new spoils uploaded on the app for you to be able to improve your skills",
    users: "All Users",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 6,
    title: "Marketing Email",
    subject: "General",
    body: "Don't miss our latest promotions and featured spoils this week.",
    users: "All Learners",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
  {
    id: 7,
    title: "Customer Signup",
    subject: "General",
    body: "Thanks for signing up to Spoilert. Explore spoils tailored to your interests.",
    users: "All Users",
    created_at: "2025-10-12T09:43:00Z",
    updated_at: "2025-10-12T09:43:00Z",
  },
];
