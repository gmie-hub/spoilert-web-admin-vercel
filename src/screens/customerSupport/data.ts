export type ChatRole = "Learner" | "Tutor" | "Admin";

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online?: boolean;
  /** Last message was sent by the admin and has been read by the recipient. */
  outgoingRead?: boolean;
}

export type MessageDirection = "incoming" | "outgoing";

export interface ChatMessage {
  id: string;
  direction: MessageDirection;
  text: string;
  time: string;
  read?: boolean;
}

export interface ChatProfile {
  name: string;
  email: string;
  role: ChatRole;
  joinedDate: string;
  avatar: string;
}

/**
 * Chat threads shown in the left list. Order matches the design.
 * Total of 8 — matches the "All 8" badge.
 */
export const chatThreads: ChatThread[] = [
  {
    id: "jade",
    name: "Jade Olasunmbo",
    avatar: "https://i.pravatar.cc/80?img=47",
    lastMessage: "Please I need help with my…",
    time: "9:41am",
    unreadCount: 1,
    online: true,
  },
  {
    id: "ifeoma",
    name: "Ifeoma Chinaza",
    avatar: "https://i.pravatar.cc/80?img=45",
    lastMessage: "Alright thanks",
    time: "9:41am",
    unreadCount: 1,
  },
  {
    id: "michael",
    name: "Michael Coker",
    avatar: "",
    lastMessage: "Send your transaction details",
    time: "9:41am",
    unreadCount: 0,
    outgoingRead: true,
  },
  {
    id: "ogunsola",
    name: "Ogunsola Omorinsola",
    avatar: "https://i.pravatar.cc/80?img=12",
    lastMessage: "This would be resolved sorry…",
    time: "9:41am",
    unreadCount: 0,
    outgoingRead: true,
  },
  {
    id: "james",
    name: "James Fortune",
    avatar: "https://i.pravatar.cc/80?img=33",
    lastMessage: "My email address is ogunsol…",
    time: "9:41am",
    unreadCount: 1,
  },
  {
    id: "mory",
    name: "Mory Coco",
    avatar: "https://i.pravatar.cc/80?img=44",
    lastMessage: "Send your transaction details",
    time: "9:41am",
    unreadCount: 0,
    outgoingRead: true,
  },
  {
    id: "shekinah",
    name: "Shekinah Glory",
    avatar: "https://i.pravatar.cc/80?img=49",
    lastMessage: "I still haven't a reply and this…",
    time: "9:41am",
    unreadCount: 1,
    online: true,
  },
  {
    id: "joshua",
    name: "Joshua Eleazar",
    avatar: "https://i.pravatar.cc/80?img=15",
    lastMessage: "Thank you for the update",
    time: "9:40am",
    unreadCount: 0,
  },
];

/**
 * Messages for the currently-selected chat (Ogunsola Omorinsola) — exactly
 * what the design shows so the layout reads correctly.
 */
export const conversationMessages: ChatMessage[] = [
  {
    id: "m1",
    direction: "incoming",
    text: "Hello, I requested a withdrawal two days ago, but I haven't received the money yet. Can you help me check?",
    time: "10:15 AM",
  },
  {
    id: "m2",
    direction: "outgoing",
    text: "Hello! Thanks for reaching out. Let me check your withdrawal status. Can you please provide your registered email or username?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: "m3",
    direction: "incoming",
    text: "My email is johndoe@email.com and my username is MorinD123.",
    time: "10:15 AM",
  },
  {
    id: "m4",
    direction: "outgoing",
    text: "Thank you, Morin. I've checked your request, and it's currently pending approval because you used a different account number. It's waiting for admin approval.",
    time: "10:30 AM",
    read: true,
  },
  {
    id: "m5",
    direction: "incoming",
    text: "Oh, I see. How long does the approval process usually take?",
    time: "10:15 AM",
  },
];

export const selectedProfile: ChatProfile = {
  name: "Ogunsola Omorinsola",
  email: "ogunsolaomorinsola@gmail.com",
  role: "Learner",
  joinedDate: "Joined 5th Feb,2025",
  avatar: "https://i.pravatar.cc/200?img=12",
};

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: ChatRole;
}

/** Full directory of contactable users — used by the "Start New Chat" modal. */
export const allContacts: Contact[] = [
  { id: "mary-coker", name: "Mary Coker", email: "cokermary958@gmail.com", avatar: "https://i.pravatar.cc/80?img=5", role: "Tutor" },
  { id: "ogunsola", name: "Ogunsola Omorinsola", email: "ogunsolaomorinsola@gmail.com", avatar: "https://i.pravatar.cc/80?img=12", role: "Learner" },
  { id: "james-fortune", name: "James Fortune", email: "fortunate@gmail.com", avatar: "https://i.pravatar.cc/80?img=33", role: "Learner" },
  { id: "alexander-lawson", name: "Alexander Lawson", email: "lawson87@gmail.com", avatar: "", role: "Tutor" },
  { id: "jade", name: "Jade Olasunmbo", email: "jadesunmboa@gmail.com", avatar: "https://i.pravatar.cc/80?img=47", role: "Learner" },
  { id: "michael-okeowo", name: "Michael Okeowo", email: "okeowomichael@gmail.com", avatar: "https://i.pravatar.cc/80?img=14", role: "Tutor" },
  { id: "chike-dantes", name: "Chike Dantes", email: "chikedantes@gmail.com", avatar: "https://i.pravatar.cc/80?img=22", role: "Learner" },
  { id: "ifeoma", name: "Ifeoma Chinaza", email: "ifeomachinaza@gmail.com", avatar: "https://i.pravatar.cc/80?img=45", role: "Tutor" },
  { id: "tola-akinbiyi", name: "Tola Akinbiyi", email: "tolaak@gmail.com", avatar: "https://i.pravatar.cc/80?img=24", role: "Learner" },
  { id: "kenechukwu-eze", name: "Kenechukwu Eze", email: "kenezek@gmail.com", avatar: "https://i.pravatar.cc/80?img=18", role: "Tutor" },
  { id: "ngozi-amaka", name: "Ngozi Amaka", email: "ngoziamaka@gmail.com", avatar: "https://i.pravatar.cc/80?img=36", role: "Learner" },
  { id: "femi-adebola", name: "Femi Adebola", email: "femiadebola@gmail.com", avatar: "https://i.pravatar.cc/80?img=11", role: "Tutor" },
  { id: "blessing-uche", name: "Blessing Uche", email: "blessinguche@gmail.com", avatar: "https://i.pravatar.cc/80?img=37", role: "Learner" },
  { id: "tunde-bakare", name: "Tunde Bakare", email: "tundeb@gmail.com", avatar: "https://i.pravatar.cc/80?img=8", role: "Tutor" },
  { id: "amara-okafor", name: "Amara Okafor", email: "amaraokafor@gmail.com", avatar: "https://i.pravatar.cc/80?img=48", role: "Learner" },
  { id: "deji-fashola", name: "Deji Fashola", email: "dejifashola@gmail.com", avatar: "https://i.pravatar.cc/80?img=13", role: "Tutor" },
];
