export const tutorOverviewInfo = [
  {
    image: "/moneys.svg",
    color: "#F0FFF4",
    header: "Total Earnings",
    amount: "N1,100,000",
  },
  {
    image: "/yellow-book.svg",
    color: "#D4A43714",
    header: "Total Spoils Created",
    amount: "10",
  },
  {
    image: "/people.svg",
    color: "#375AD414",
    header: "Followers",
    amount: "10",
  },
];

export const spoilsCreatedHeader = [
  "Spoil Title",
  "Amount",
  "Enrolled Learners",
  "Amount Earned",
  "Date Created",
  "Status",
  "Action",
];

export const tutorTabList = [
  {
    value: "tutorOverview",
    text: "Tutor Overview",
  },
  {
    value: "spoilsCreated",
    text: "Spoils Created",
  },
  {
    value: "earningBreakdown",
    text: "Earnings Breakdown",
  },
  {
    value: "transactions",
    text: "Transactions",
  },
];

export const spoilsCreatedTableData = [
  {
    spoiltTitle: "Understanding Design Principles",
    amount: "N20,000",
    enrolledLearners: "10",
    amountEarned: "N200,000",
    dateCreated: "12-02-2025",
    status: "Active",
  },
  {
    spoiltTitle: "Frontend Development",
    amount: "N100,000",
    enrolledLearners: "5",
    amountEarned: "N500,000",
    dateCreated: "12-02-2025",
    status: "Unpublished",
  },
  {
    spoiltTitle: "CHM202- IUPAC Nomenclature",
    amount: "N80,000",
    enrolledLearners: "20",
    amountEarned: "N1,600,000",
    dateCreated: "12-02-2025",
    status: "Active",
  },
  {
    spoiltTitle: "Financial Literacy",
    amount: "N40,000",
    enrolledLearners: "15",
    amountEarned: "N850,000",
    dateCreated: "12-02-2025",
    status: "Unpublished",
  },
  {
    spoiltTitle: "BCH 404- Pharmacology",
    amount: "N30,000",
    enrolledLearners: "8",
    amountEarned: "N240,000",
    dateCreated: "12-02-2025",
    status: "Active",
  },
];

export const enrolledLearnersData = [
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Completed" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Completed" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Ongoing" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Ongoing" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Not Started" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Completed" },
  { name: 'Ogunsola Omorinsola', username: "Omorinn", dateEnrolled: "12-02-2025", status: "Not Started" },
];

export const transactionsData = [
  { transactionType: "Spoil Purchase", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Successful", description: "Basic Design Principles Spoil", spoilCostFee: "₦25,000", adminFee: "₦2,000", certFee: "₦500", vat: "₦1250", totalAmountPaid: "₦40,000" },
  { transactionType: "Sponsorship", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Successful", description: "Basic Design Principles Spoil", sponsoredLearners: 10, spoilCostFee: "₦25,000", adminFee: "₦2,000", certFee: "₦500", vat: "₦1250", totalAmountPaid: "₦40,000" },
  { transactionType: "Withdrawal", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Failed", description: "Wallet Withdrawal", accountCredited: "2102925627 (Access Bank) - Ogunsola Omorinsola" },
  { transactionType: "Airtime", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Successful", description: "Airtime Purchase of MTN ₦500", serviceProvider: "MTN", phone: "08123445678" },
  { transactionType: "Data", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Successful", description: "2gb for ₦500 ", serviceProvider: "MTN", phone: "08123445678" },
  { transactionType: "Spoil Purchase", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Pending", spoilCostFee: "₦25,000", adminFee: "₦2,000", certFee: "₦500", vat: "₦1250", totalAmountPaid: "₦40,000" },
  { transactionType: "Spoil Purchase", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Failed", spoilCostFee: "₦25,000", adminFee: "₦2,000", certFee: "₦500", vat: "₦1250", totalAmountPaid: "₦40,000" },
  { transactionType: "Withdrawal", transactionID: "ID-12345683902", amount: "N150,000", dateTime: "12-10-22 | 09:43 am", status: "Successful", description: "Wallet Withdrawal", accountCredited: "2102925627 (Access Bank) - Ogunsola Omorinsola" },
];

export const transactionsHeader = [
  "Transaction Type", "Transaction ID", "Amount", "Date and Time", "Status", "Action"
]

export const summaryData = [
  {
    id: 1,
    icon: "/blue-wallet.svg",
    boxColor: "#013B4D",
    borderColor: "#A5D1DE",
    bg: "#E3F5FA",
    title: "Total Earnings",
    value: "N800,00.00",
    alt: "earnings",
  },
  {
    id: 2,
    icon: "/book.svg",
    boxColor: "#DA8543",
    borderColor: "#F9D0B0",
    bg: "#FFF0E4",
    title: "Spoils Created",
    value: "25",
    alt: "spoils",
  },
];

export const earningsBreakdownData = 
  {
    id: 1,
    course: "BCH 404 - Biological",
    category: "Pharmacology",
    enrolleeNo: 32,
    amount: "N100,000",
  };
