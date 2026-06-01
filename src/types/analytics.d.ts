export interface ActiveLearnerPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  active_learners: number;
}

export interface ActiveLearnersOverview {
  total_active_learners: number;
  total_enrollments: number;
  completed_learners: number;
}

export interface ActiveLearnersData {
  graph: ActiveLearnerPoint[];
  overview: ActiveLearnersOverview;
}

export interface ActiveLearnersResponse {
  message?: string;
  status?: boolean;
  data: ActiveLearnersData;
}

export interface UserSignupPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  total_users: number;
}

export interface UserSignupsOverview {
  total_users: number;
  verified_users: number;
  active_users: number;
}

export interface UserSignupsData {
  overview: UserSignupsOverview;
  graph: UserSignupPoint[];
}

export interface UserSignupsResponse {
  message?: string;
  status?: boolean;
  data: UserSignupsData;
}

export interface SignupMethodPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  web: number;
  app: number;
  total: number;
}

export interface SignupMethodOverview {
  web: number;
  app: number;
  total_users: number;
}

export interface SignupMethodData {
  overview: SignupMethodOverview;
  graph: SignupMethodPoint[];
}

export interface SignupMethodResponse {
  message?: string;
  status?: boolean;
  data: SignupMethodData;
}

export interface UserTypeSignupPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  learners: number;
  tutors: number;
}

export interface UserTypeSignupOverview {
  total_learners: number;
  total_tutors: number;
  total_users: number;
}

export interface UserTypeSignupData {
  overview: UserTypeSignupOverview;
  graph: UserTypeSignupPoint[];
}

export interface UserTypeSignupResponse {
  message?: string;
  status?: boolean;
  data: UserTypeSignupData;
}

export interface SpoilsCreatedPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  total_spoils: number;
}

export interface SpoilsCreatedOverview {
  total_spoils: number;
  active_spoils: number;
  draft_spoils: number;
  pending_spoils: number;
}

export interface SpoilsCreatedData {
  overview: SpoilsCreatedOverview;
  graph: SpoilsCreatedPoint[];
}

export interface SpoilsCreatedResponse {
  message?: string;
  status?: boolean;
  data: SpoilsCreatedData;
}

export interface PaymentsRevenuePoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  revenue: number;
}

export interface PaymentsRevenueOverview {
  total_revenue: number;
  total_transactions: number;
  average_transaction_value: number;
}

export interface PaymentsRevenueData {
  overview: PaymentsRevenueOverview;
  graph: PaymentsRevenuePoint[];
}

export interface PaymentsRevenueResponse {
  message?: string;
  status?: boolean;
  data: PaymentsRevenueData;
}

export interface SpoilTypeData {
  totalSimpleSpoils: number;
  totalAdvancedSpoils: number;
  enrolledSimpleUsers: number;
  enrolledAdvancedUsers: number;
  ongoingSimpleUsers: number;
  ongoingAdvancedUsers: number;
  completedSimpleUsers: number;
  completedAdvancedUsers: number;
}

export interface SpoilTypeResponse {
  message?: string;
  status?: boolean;
  data: SpoilTypeData;
}

export interface BestPerformingCategoryRow {
  categoryId: number | null;
  categoryName: string | null;
  spoilId: number;
  spoilName: string;
  tutorId: number | null;
  tutorName: string;
  totalEnrollments: number;
}

interface BestPerformingPaginationLink {
  url: null | string;
  label: string;
  active: boolean;
}

export interface BestPerformingCategoryData {
  current_page: number;
  data: BestPerformingCategoryRow[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: BestPerformingPaginationLink[];
  next_page_url: null | string;
  path: string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  total: number;
}

export interface BestPerformingCategoryResponse {
  message?: string;
  status?: boolean;
  data: BestPerformingCategoryData;
}

export interface BestPerformingOverviewSpoil {
  spoil_id: number;
  spoil_name: string;
  cover_image: string | null;
  total_enrollments: number;
}

export interface BestPerformingGraphPoint {
  // Period bucket, formatted as "YYYY-MM" e.g. "2026-05".
  label: string;
  spoil_name: string;
  total_enrollments: number;
}

export interface BestPerformingData {
  overview: BestPerformingOverviewSpoil[];
  graph: BestPerformingGraphPoint[];
}

export interface BestPerformingResponse {
  message?: string;
  status?: boolean;
  data: BestPerformingData;
}

// Dashboard summary returned by GET /analytics.
// NOTE: confirm these field names match the actual API response.
export interface DashboardAnalyticsData {
  total_learners: number;
  total_tutors: number;
  total_spoils: number;
  revenue_generated: number;
  total_payout: number;
  total_sponsorships: number;
}

export interface DashboardAnalyticsResponse {
  message?: string;
  status?: boolean;
  data: DashboardAnalyticsData;
}
