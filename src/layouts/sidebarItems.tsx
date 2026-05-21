import type { ReactNode } from "react";

import {
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineRefresh,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";

import Management from "../assets/book.svg";
import Overview from "../assets/category.svg";
import Sponsorships from "../assets/discount-circle.svg";
import Withdrawal from "../assets/moneys.svg";
import Learners from "../assets/people2.svg";
import Tutors from "../assets/profile-2user.svg";
import Settings from "../assets/setting-2.svg";
import Transactions from "../assets/wallet-3.svg";
import { routes } from "../routes";

export type NavItem = {
  key: string;
  label: string;
  icon: ReactNode;
  to: string;
};

export const mainItems: NavItem[] = [
  {
    key: "Overview",
    label: "Overview",
    icon: <img src={Overview} alt="Overview" />,
    to: routes.main.dashboard,
  },
  {
    key: "Learners",
    label: "Learners",
    icon: <img src={Learners} alt="Learners" />,
    to: routes.main.learners.home,
  },
  {
    key: "Tutors",
    label: "Tutors",
    icon: <img src={Tutors} alt="Tutors" />,
    to: routes.main.tutors.home,
  },
  {
    key: "Categories",
    label: "Categories",
    icon: <img src="/category.svg" alt="category" />,
    to: routes.main.categories.home,
  },
  {
    key: "Spoil Review",
    label: "Spoil Review",
    icon: <img src="/spoil.svg" alt="review" />,
    to: routes.main.spoilReview.home,
  },
  {
    key: "Spoil Management",
    label: "Spoil Management",
    icon: <img src={Management} alt="Management" />,
    to: routes.main.spoilMgt.home,
  },
  {
    key: "Pending Verifications",
    label: "Pending Verifications",
    icon: <img src="/verify.svg" alt="Management" />,
    to: routes.main.pendingVerification.home,
  },
  {
    key: "Sponsorships",
    label: "Sponsorships",
    icon: <img src={Sponsorships} alt="Sponsorships" />,
    to: routes.main.sponsorships.home,
  },
  {
    key: "Promotions",
    label: "Promotions ",
    icon: <img src={Withdrawal} alt="Promotions" />,
    to: routes.main.promotions.home,
  },
  {
    key: "PromotionsManagement",
    label: "Promotions Management",
    icon: <img src={Withdrawal} alt="PromotionsManagement" />,
    to: routes.main.promotions.promotionsManagement,
  },
  {
    key: "Withdrawal Requests",
    label: "Withdrawal Requests",
    icon: <img src={Withdrawal} alt="Withdrawal" />,
    to: routes.main.withdrawalRequest.home,
  },
  {
    key: "Transactions",
    label: "Transactions",
    icon: <img src={Transactions} alt="Transactions" />,
    to: routes.main.transactions.home,
  },
  {
    key: "Community",
    label: "Community",
    icon: <img src="/community.svg" alt="Community" />,
    to: routes.main.community.home,
  },
  {
    key: "ads",
    label: "Ads",
    icon: <img src="/ads.svg" alt="ads" />,
    to: routes.main.ads.home,
  },
];

export const analyticsSubItems: NavItem[] = [
  {
    key: "UserInsights",
    label: "User Insights",
    icon: <HiOutlineViewGrid size={20} />,
    to: routes.main.analytics.userInsights,
  },
  {
    key: "UserRegistration",
    label: "User Registration",
    icon: <HiOutlineRefresh size={20} />,
    to: routes.main.analytics.userRegistration,
  },
  {
    key: "SpoilsCreated",
    label: "Spoils Created",
    icon: <HiOutlineBookOpen size={20} />,
    to: routes.main.analytics.spoilsCreated,
  },
  {
    key: "RevenueGenerated",
    label: "Revenue Generated",
    icon: <HiOutlineCurrencyDollar size={20} />,
    to: routes.main.analytics.revenueGenerated,
  },
  {
    key: "SpoilTypeAnalytics",
    label: "Spoil Type Analytics",
    icon: <HiOutlineDocumentText size={20} />,
    to: routes.main.analytics.spoilTypeAnalytics,
  },
];

export const spoilPerformanceSubItems: NavItem[] = [
  {
    key: "SpoilOverTime",
    label: "Spoil Over Time",
    icon: <HiOutlineChartBar size={20} />,
    to: routes.main.analytics.spoilPerformance.spoilOverTime,
  },
  {
    key: "SpoilPerCategory",
    label: "Spoil Per Category",
    icon: <HiOutlineViewList size={20} />,
    to: routes.main.analytics.spoilPerformance.spoilPerCategory,
  },
];

export const bottomItems: NavItem[] = [
  {
    key: "Customer Support",
    label: "Customer Support",
    icon: <img src="/customer.svg" alt="CustomerSupport" />,
    to: routes.main.customerSupport.home,
  },
  {
    key: "Settings",
    label: "Settings",
    icon: <img src={Settings} alt="Settings" />,
    to: routes.main.settings.home,
  },
];
