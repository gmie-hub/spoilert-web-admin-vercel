export const promotionsHeaders = [
  "Promotion Name",
  "Duration",
  "Amount",
  "Date Created",
  "Action",
];

export const promotionsTableData = [
  {
    id: 1,
    promotionName: "Summer Sale",
    duration: "30 days",
    amount: "₦50,000",
    date: "2024-05-01",
    time: "10:00 am",
  },
  {
    id: 2,
    promotionName: "Winter Discount",
    duration: "45 days",
    amount: "₦75,000",
    date: "2024-06-15",
    time: "10:00 am",
  },
  {
    id: 3,
    promotionName: "Winter Discount",
    duration: "45 days",
    amount: "₦75,000",
    date: "2024-06-15",
    time: "10:00 am",
  },
];

export type PromotionData = typeof promotionsTableData;

export const promotionManagementHeader = [
  "S/N",
  "Spoil Title",
  "Name of Tutor",
  "Promotion Package",
  "Amount",
  "Start Date",
  "End Date",
  "Status",
  "Action",
];

export const promotionManagementData = [
  {
    id: 1,
    spoilTitle: "Understanding Design Principles",
    nameOfTutor: "Ogunsola Omorinsola",
    promotionPackage: "Summer Sale",
    amount: "₦50,000",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "Active",
  },
  {
    id: 2,
    spoilTitle: "Understanding Design Principles",
    nameOfTutor: "Ogunsola Omorinsola",
    promotionPackage: "Winter Discount",
    amount: "₦75,000",
    startDate: "2024-06-15",
    endDate: "2024-07-15",
    status: "Active",
  },
  {
    id: 3,
    spoilTitle: "Understanding Design Principles",
    nameOfTutor: "Ogunsola Omorinsola",
    promotionPackage: "Summer Sale",
    amount: "₦50,000",
    startDate: "2024-05-01",
    endDate: "2024-05-31",
    status: "Active",
  },
  {
    id: 4,
    spoilTitle: "Understanding Design Principles",
    nameOfTutor: "Ogunsola Omorinsola",
    promotionPackage: "Winter Discount",
    amount: "₦75,000",
    startDate: "2024-06-15",
    endDate: "2024-07-15",
    status: "Active",
  },
];

export const promotionsManagementTabList = [
  {
    value: "Overview",
    text: "Overview",
  },
  {
    value: "Metric",
    text: "Metric",
  },
];

export const metricData = [
  {
    id: 1,
    color: "#E3F5FA",
    icon: "/blue-eye.svg",
    title: "Total Number of Views",
    value: "2,000",
  },
  {
    id: 2,
    color: "#FFEEE1",
    icon: "/finger.svg",
    title: "Total Number of Clicks",
    value: "1,300",
  },
  {
    id: 3,
    color: "#F7E8EC",
    icon: "/okay.svg",
    title: "Total Number of Likes",
    value: "2,000",
  },
  {
    id: 4,
    color: "#F9F0FA",
    icon: "/share.svg",
    title: "Total Number of Shares",
    value: "2,000",
  },
  {
    id: 5,
    color: "#EAF0FF",
    icon: "/blue-user.svg",
    title: "Total Number of Enrollment",
    value: "2,000",
  },
  
];

export type PromotionManagementData = typeof promotionManagementData;
