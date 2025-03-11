export const routes = {
    dashboard: '/dashboard',
    // auth: {
    //   login: '/',
    //   forgotPassword: '/forgot-password',
    //   resetPassword: '/reset-password/:email',
    //   ResetPasswordVerificationCode: '/reset-password-verification-code/:email/',
    //   passwordResetSuccessful: '/password-reset-successful',
    // },
    users: {
      overview:'/overview',
      allUsers: '/all-user',
      viewUserDetails: '/view-user-details/:id',
      viewAdDetails: 'view-ad-details/:id',
      sellers: '/sellers',
      viewSellerDetails: '/view-seller-details/:id',
      flaggedReviews: '/flagged-reviews',
      viewFlaggedReview: '/view-flagged-review/:id',
      viewReview: '/view-review/:id',
  
    },
    categories: {
      categories: '/categories',
      addCategory: '/add-category',
      editCategory: 'edit-category/:id',
      subCategories: '/sub-categories',
      addSubCategory: '/add-sub-category',
      editSubCategory: '/edit-sub-category/:id',
    },
    roles: {
      roles: '/roles',
      addRoles: '/add-roles',
      editRoles: '/edit-roles/:id',
      subAdmin: '/sub-admins',
      addSubAdmin: '/add-sub-admin',
      viewSubAdmin: '/view-sub-admin/:id',
      editSubAdmin: '/edit-sub-admin/:id',
    },
    adverts: {
      adverts: '/adverts',
      addAdvert: '/add-advert',
      editAdvert: '/edit-advert/:id',
      viewAdvertDetails: '/view-advert-details/:id',
    },
    transactions: {
      transactions: '/transactions',
      viewTransactionDetails: '/view-transaction-details/:id',
    },
    subscriptions: {
      subscriptionPlans: '/subscription-plans',
      addSubscriptionPlan: '/add-subscription-plan',
      editSubscriptionPlan: '/edit-subscription-plan/:id',
      viewSubscriptionPlanDetails: '/view-subscription-plan-details/:id',
      userSubscription: '/user-subscription',
  
    },
   
    cmsPage: {
      cmsPages: '/cms-pages',
      addCmsPages: '/add-cms-page',
      editCmsPages: '/edit-cms-page/:id',
      viewCmsPagesDetails: '/view-cms-page-details/:id',
    },
    contactEnquiries: {
      contactEnquiries: '/contact-enquiries',
      viewContactEnquiries: '/view-contact-enquiries',
    },
    notifications: {
      notifications: '/notifications',
      viewNotification: '/view-notification',
      sendNotification: '/send-notification',
    },
    settings: {
      settings: '/settings',
      editBasicDetails: '/edit-basic-details',
  
    },
    mailings: {
      mailing: '/mailing',
      editMailing: '/edit-mailing',
    },
    activityLog: '/activity-log',
    analytics: {
      userAnalytics: '/user-analytics',
      sellerAnalytics: '/seller-analytics',
      adsAnalytics: '/ads-analytics',
      subscriptionAnalytics: '/subscription-analytics',
      JobAnalytics: '/job-analytics',
  
    },
    ads: {
      pendingAds: '/pending-ads',
      viewPendingAds: '/view-pending-ads/:id',
      sellerAds: '/seller-ads',
      viewSellerAds: '/view-seller-ads/:id',
      editSellerAds: '/edit-seller-ad/:id',
      adminAds: '/admin-ads',
      viewAdminAds: '/view-admin-ads/:id',
      addAdminAds: '/add-admin-ad',
      editAdminAd: '/edit-admin-ad/:id',
      recommendedAds: '/recommended-ads',
      viewRecommendedAds: '/view-recommended-ads/:id',
      addRecommendedAds: '/add-recommended-ad',
      editRecommendedAd: '/edit-recommended-ad/:id',
      editPendingAd: '/edit-pending-ad/:id',
  
    },
    directory: {
      allBusinesses: '/directory/all-businesses',
      addBusiness: '/directory/add-business',
      editBusiness: '/directory/edit-business/:id',
      viewBusiness: '/directory/view-business/:id',
      pendingVerifications: '/directory/pending-verifications',
      viewPendingVerification: '/directory/view-pending-verification/:id',
      subscriptionPlans: '/directory/subscription-plans',
      viewSubscriptionPlan: `/directory/view-subscription-plan/:id`,
      addSubscriptionPlan: '/directory/add-subscription-plan',
      editSubscriptionPlan: '/directory/edit-subscription-plan/:id',
      claimHistory: '/directory/claim-history/:id',
      ClaimedDetails: '/directory/claimed-details/:id',
      JobDetails: '/directory/job-details/:id',
  
    },
    jobs: {
      jobs: '/jobs',
      viewJobDetails: '/jobs/view-job-details/:id',
      viewJob: '/jobs/view-job',
      viewApplicants: '/jobs/view-applicant/:id',
      postJob: '/jobs/post-job',
      editJob: '/jobs/edit-job/:id',
      jobFeedback: '/jobs/job-feedback',
      viewJobFeedback: '/jobs/view-feedback-details/:id',
      viewApplicantFeedback: '/jobs/view-applicant-feedback/:id',
      flaggedJobs: '/jobs/flagged-jobs',
      flaggedJobDetails: '/jobs/flagged-job-details/:id',
      industries: '/jobs/industries',
      applicants: '/jobs/applicants',
      applicantDetails: '/applicant-details/:id',
  
  
  
    },
  };
  
  export const routeParts = {
    [routes.directory.allBusinesses]: {
      route: routes.directory.allBusinesses,
      name: 'All Business',
      params: '',
      isRoot: true,
    },
    [routes.directory.viewBusiness]: {
      route: routes.directory.viewBusiness,
      name: 'View Business',
      params: '1',
      isRoot: false,
    },
    [routes.directory.editBusiness]: {
      route: routes.directory.editBusiness,
      name: 'Edit Business',
      params: '1',
    },
  
    [routes.jobs.viewJobDetails]: {
      route: routes.jobs.viewJobDetails,
      name: 'View Job Details',
      params: '',
      isRoot: false,
    },
    [routes.jobs.editJob]: {
      route: routes.jobs.editJob,
      name: 'Edit Job',
      params: '1',
      isRoot: false,
    },
    [routes.jobs.jobs]: {
      route: routes.jobs.jobs,
      name: 'Jobs',
      params: '',
      isRoot: true,
    },
    [routes.jobs.jobFeedback]: {
      route: routes.jobs.jobFeedback,
      name: 'Job Details',
      params: '',
      isRoot: true,
    },
    [routes.jobs.viewApplicantFeedback]: {
      route: routes.jobs.jobFeedback,
      name: 'View Applicants Feedback',
      params: '1',
      isRoot: false,
    },
    [routes.jobs.viewJobFeedback]: {
      route: routes.jobs.viewJobFeedback,
      name: 'View Feedback Details',
      params: '1',
      isRoot: false,
    },
    [routes.jobs.flaggedJobs]: {
      route: routes.jobs.flaggedJobs,
      name: 'Flagged Jobs',
      params: '',
      isRoot: true,
    },
    [routes.jobs.flaggedJobDetails]: {
      route: routes.jobs.flaggedJobs,
      name: 'View Flag Details',
      params: '1',
      isRoot: false,
    },
    [routes.directory.pendingVerifications]: {
      route: routes.directory.pendingVerifications,
      name: 'Pending Verifications',
      params: '',
      isRoot: true,
    },
    [routes.directory.editBusiness]: {
      route: routes.directory.editBusiness,
      name: 'Edit Business',
      params: '1',
      isRoot: false,
    },
    [routes.directory.addBusiness]: {
      route: routes.directory.addBusiness,
      name: 'Add Business',
      params: '',
      isRoot: false,
    },
    [routes.directory.claimHistory]: {
      route: routes.directory.claimHistory,
      name: 'Claim History',
      params: '1',
      isRoot: false,
    },
    [routes.directory.viewPendingVerification]: {
      route: routes.directory.claimHistory,
      name: 'View Verification Details',
      params: '1',
      isRoot: false,
    },
    [routes.directory.addSubscriptionPlan]: {
      route: routes.directory.addSubscriptionPlan,
      name: 'Create A Subscription Plan',
      params: '1',
      isRoot: false,
    },
    [routes.directory.viewSubscriptionPlan]: {
      route: routes.directory.viewSubscriptionPlan,
      name: 'Subscription Details',
      params: '1',
      isRoot: false,
    },
    [routes.directory.editSubscriptionPlan]: {
      route: routes.directory.editSubscriptionPlan,
      name: 'Edit Subscription Details',
      params: '1',
      isRoot: false,
    },
    [routes.directory.subscriptionPlans]: {
      route: routes.directory.subscriptionPlans,
      name: 'Subscription Plans',
      params: '',
      isRoot: true,
    },
    [routes.directory.ClaimedDetails]: {
      route: routes.directory.ClaimedDetails,
      name: 'Claim Details',
      params: '',
      isRoot: false,
    },
  };
  
 