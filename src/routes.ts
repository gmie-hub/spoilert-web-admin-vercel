export const routes = {
  main: {
    dashboard: "/dashboard",
    learners: {
      home: "/learners",
      viewDetails: "/view-learner-details/:id/:spoil_id?",
    },
    tutors: {
      home: "/tutors",
      tutorDetails: "/tutors/tutor-details/:id/:spoil_id?",
    },
    categories: {
      home: "/categories",
      categoryDetails: "/category-details/:id/",
    },
    createSpolyz: {
      home: "/create-spolyz",
      simple: "/create-spolyz/simple",
      simpleReview: "/create-spolyz/simple/review",
      advanced: "/create-spolyz/advanced",
      advancedQuiz: {
        pre: "/create-spolyz/advanced/quiz/pre",
        post: "/create-spolyz/advanced/quiz/post",
        module: "/create-spolyz/advanced/quiz/module/:moduleId",
      },
    },
    spoilMgt: {
      home: "/spoil-management",
      spoilDetails: "/spoil-details/:id",
    },
    disabledSpolyz: {
      home: "/disabled-spolyz",
    },
    spoilReview: {
      home: "/spoil-review",
      spoilDetails: "/spoil-details-review/:id",
    },
    promotions: {
      home: "/promotions",
      promotionsDetails: "/promotions-details/:id",
      setupPromotion: "/setup-promotion",
      editPromotion: "/edit-promotion/:id",
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
    reports: {
      reportedTutors: {
        home: "/reports/reported-tutors",
        details: "/reports/reported-tutors/:id",
      },
      reportedSpoylz: {
        home: "/reports1/reported-spoylz",
        details: "/reports/reported-spoylz/:id",
      },
    },
    bannedUsers: {
      home: "/banned-users1",
      details: "/banned-users/:id",
    },
    withdrawalRequest: {
      home: "/withdrawal-request",
    },
    transactions: {
      home: "/transactions",
    },
    community: {
      home: "/community",
      details: "/community-details",
    },
    customerSupport: {
      home: "/customer-support",
    },
    settings: {
      home: "/settings",
      editProfile: "/edit-profile",
    },
    pendingVerification: {
      home: "/pending-verifications",
      details: "/view-pending-verification/:id",
    },
    notifications: {
      home: "/notifications",
      details: "/notification-details/:id",
      send: "/send-notification",
    },
    mailing: {
      home: "/mailing",
      details: "/mail-details/:id",
      send: "/send-email",
    },
    ads: {
      home: "/ads",
      adsDetails: "/ads-details/:id",
      createAd: "/create-ad",
      editAd: "/edit-ad/:id",
    },
    analytics: {
      userInsights: "/analytics/user-insights",
      userRegistration: "/analytics/user-registration",
      spoilsCreated: "/analytics/spoils-created",
      revenueGenerated: "/analytics/revenue-generated",
      spoilTypeAnalytics: "/analytics/spoil-type-analytics",
      spoilPerformance: {
        home: "/analytics/spoil-performance",
        spoilOverTime: "/analytics/spoil-performance/spoil-over-time",
        spoilPerCategory: "/analytics/spoil-performance/spoil-per-category",
      },
    },
  },
  auth: {
    login: '/',
    // forgotPassword: '/forgot-password',
    // resetPassword: '/reset-password/:email',
    // ResetPasswordVerificationCode: '/reset-password-verification-code/:email/',
    // passwordResetSuccessful: '/password-reset-successful',
  },
};
