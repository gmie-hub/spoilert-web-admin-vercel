export const routes = {
  main: {
    dashboard: "/",
    learners: {
      home: "/learners",
      viewDetails: "/view-learner-details",
    },
    tutors: {
      home: "/tutors",
      tutorDetails: "/tutors/tutor-details",
    },
    categories: {
      home: "/categories",
      categoryDetails: "/category-details",
    },
    spoilMgt: {
      home: "/spoil-management",
      spoilDetails: "/spoil-details/:id",
    },
    spoilReview: {
      home: "/spoil-review",
      spoilDetails: "/spoil-details-review/:id",
    },
    promotions: {
      home: "/promotions",
      promotionsDetails: "/promotions-details/:id",
      promotionsManagement: "/promotions-management",
    },
    promotionsManagement:{
      home: "/promotions-management",
      promotionsManagementDetails: "/promotions-management-details/:id",
    },
    sponsorships: {
      home: "/sponsorships",
      details: "/sponsorship-details",
      sponsorASpoil: "/sponsor-a-spoil",
      sponsorshipCodes: "/sponsorship-codes",
    },
    withdrawalRequest: {
      home: "/withdrawal-request",
    },
    transactions: {
      home: "/transactions",
    },
    community: {
      home: "/community",
    },
    customerSupport: {
      home: "/customer-support",
    },
    settings: {
      home: "/settings",
    },
    pendingVerification: {
      home: "/pending-verifications",
      details: "/view-pending-verification/:id",
    },
  },
  // auth: {
  //   login: '/',
  //   forgotPassword: '/forgot-password',
  //   resetPassword: '/reset-password/:email',
  //   ResetPasswordVerificationCode: '/reset-password-verification-code/:email/',
  //   passwordResetSuccessful: '/password-reset-successful',
  // },
};
