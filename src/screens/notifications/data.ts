export const typeOptions = [
  { value: "push", label: "Push notification" },
  { value: "in_app", label: "In-App Notification" },
];

/**
 * Deep-link destinations inside the Spoilert app. The value is what the app
 * matches on when a user taps the notification, so it must stay in sync with
 * the route keys the mobile/web client ships.
 */
export const routeOptions = [
  { label: "HOME PAGE", value: "home_page" },
  { label: "ALL SPOYLZ", value: "all_spoylz" },
  { label: "CATEGORIES PAGE", value: "categories_page" },
  { label: "SEARCH", value: "search" },
  { label: "MY LEARNING", value: "my_learning" },
  { label: "SAVED SPOYLZ", value: "saved_spoylz" },
  { label: "MY CERTIFICATES", value: "my_certificates" },
  { label: "LEADERBOARD", value: "leaderboard" },
  { label: "REGISTER AS TUTOR", value: "register_as_tutor" },
  { label: "TUTOR DASHBOARD", value: "tutor_dashboard" },
  { label: "CREATE A SPOIL", value: "create_spoil" },
  { label: "MY CREATED SPOYLZ", value: "my_created_spoylz" },
  { label: "MY LEARNERS", value: "my_learners" },
  { label: "TUTOR VERIFICATION", value: "tutor_verification" },
  { label: "TUTOR ANALYTICS", value: "tutor_analytics" },
  { label: "REVIEWS", value: "reviews" },
  { label: "WALLET", value: "wallet" },
  { label: "TRANSACTIONS", value: "transactions" },
  { label: "WITHDRAWAL", value: "withdrawal" },
  { label: "PROMOTE A SPOIL", value: "promote_a_spoil" },
  { label: "MY PROMOTIONS", value: "my_promotions" },
  { label: "SPONSORSHIPS", value: "sponsorships" },
  { label: "SPONSOR A SPOIL", value: "sponsor_a_spoil" },
  { label: "REDEEM SPONSORSHIP CODE", value: "redeem_sponsorship_code" },
  { label: "COMMUNITY", value: "community" },
  { label: "CHAT", value: "chat" },
  { label: "NOTIFICATIONS", value: "notifications" },
  { label: "MY PROFILE", value: "my_profile" },
  { label: "SETTINGS", value: "settings" },
  { label: "HELP & SUPPORT", value: "help" },
];
