import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import { routes } from "./routes";
import AdsDetails from "./screens/ads/adsDetails.tsx";
import CreateAds from "./screens/ads/createAds.tsx";
import Ads from "./screens/ads/index.tsx";
import RevenueGenerated from "./screens/analytics/revenueGenerated/index.tsx";
import SpoilOverTime from "./screens/analytics/spoilPerformance/spoilOverTime/index.tsx";
import SpoilPerCategory from "./screens/analytics/spoilPerformance/spoilPerCategory/index.tsx";
import SpoilsCreated from "./screens/analytics/spoilsCreated/index.tsx";
import SpoilTypeAnalytics from "./screens/analytics/spoilTypeAnalytics/index.tsx";
import UserInsights from "./screens/analytics/userInsights/index.tsx";
import UserRegistration from "./screens/analytics/userRegistration/index.tsx";
import Login from "./screens/auth/login.tsx";
import BannedUserDetails from "./screens/bannedUsers/bannedUserDetails.tsx";
import BannedUsers from "./screens/bannedUsers/index.tsx";
import Categories from "./screens/categories";
import CategoryDetails from "./screens/categories/categoryDetails.tsx";
import CommunityDetails from "./screens/community/communityDetails.tsx";
import Community from "./screens/community/index.tsx";
import CreateSpolyz from "./screens/createSpolyz/index.tsx";
import CreateAdvancedSpolyz from "./screens/createSpolyz/createAdvancedSpolyz/index.tsx";
import CreateQuiz from "./screens/createSpolyz/createQuiz/index.tsx";
import CreateSimpleSpolyz from "./screens/createSpolyz/createSimpleSpolyz/index.tsx";
import ReviewSimpleSpolyz from "./screens/createSpolyz/createSimpleSpolyz/review/index.tsx";
import CustomerSupport from "./screens/customerSupport/index.tsx";
import Dashboard from "./screens/dashBoard/index.tsx";
import DisabledSpolyz from "./screens/disabledSpolyz/index.tsx";
import Learners from "./screens/learners";
import ViewLearnerDetails from "./screens/learners/viewLearnerDetails";
import Mailing from "./screens/mailing/index.tsx";
import MailDetails from "./screens/mailing/mailDetails.tsx";
import SendEmail from "./screens/mailing/sendEmail.tsx";
import Notifications from "./screens/notifications/index.tsx";
import NotificationDetails from "./screens/notifications/notificationDetails.tsx";
import SendNotification from "./screens/notifications/sendNotification.tsx";
import PendingVerification from "./screens/pendingVerification/index.tsx";
import VerificationDetails from "./screens/pendingVerification/verificationDetails.tsx";
import Promotion from "./screens/promotion/index.tsx";
import PromotionDetails from "./screens/promotion/promotionDetails.tsx";
import SetupPromotion from "./screens/promotion/setupPromotion.tsx";
import PromotionsManagement from "./screens/promotionManagement/index.tsx";
import PromotionManagementDetails from "./screens/promotionManagement/promotionDetails.tsx";
import ReportedSpoylz from "./screens/reports/reportedSpoylz/index.tsx";
import ReportedSpoilDetails from "./screens/reports/reportedSpoylz/reportDetails.tsx";
import ReportedTutors from "./screens/reports/reportedTutors/index.tsx";
import ReportDetails from "./screens/reports/reportedTutors/reportDetails.tsx";
import Settings from "./screens/settings/index.tsx";
import EditProfile from "./screens/settings/tabs/editProfile.tsx";
import SpoilsManagement from "./screens/spoilsManagement.tsx";
import SpoilDetails from "./screens/spoilsManagement.tsx/spoilDetails.tsx";
import Sponsorships from "./screens/sponsorships";
import SponsorshipASpoil from "./screens/sponsorships/sponsorASpoil/index.tsx";
import SponsorshipCodes from "./screens/sponsorships/sponsorASpoil/sponsorshipCodes.tsx";
import SponsorshipDetails from "./screens/sponsorships/sponsorshipDetails.tsx";
import Transactions from "./screens/transactions";
import Tutors from "./screens/tutors";
import TutorDetails from "./screens/tutors/tutorDetails/index.tsx";
import WithdrawerRequest from "./screens/withdrawerRequest.tsx";
import SpoilsReview from "./spoilReview/index.tsx";
import SpoilReviewDetails from "./spoilReview/spoilDetails.tsx";
import ProtectedRoute from "./utils/protectedRoute.tsx";

function App() {
  const appRoutes = [
    { path: routes.main.dashboard, element: <Dashboard /> },
    { path: routes.main.learners.home, element: <Learners /> },
    { path: routes.main.learners.viewDetails, element: <ViewLearnerDetails /> },

    { path: routes.main.tutors.home, element: <Tutors /> },
    { path: routes.main.tutors.tutorDetails, element: <TutorDetails /> },

    { path: routes.main.spoilMgt.home, element: <SpoilsManagement /> },
    { path: routes.main.spoilMgt.spoilDetails, element: <SpoilDetails /> },

    { path: routes.main.disabledSpolyz.home, element: <DisabledSpolyz /> },

    { path: routes.main.spoilReview.home, element: <SpoilsReview /> },
    {
      path: routes.main.spoilReview.spoilDetails,
      element: <SpoilReviewDetails />,
    },

    {
      path: routes.main.promotionsManagement.home,
      element: <PromotionsManagement />,
    },
    {
      path: routes.main.promotionsManagement.promotionsManagementDetails,
      element: <PromotionManagementDetails />,
    },

    {
      path: routes.main.promotions.home,
      element: <Promotion />,
    },
    {
      path: routes.main.promotions.setupPromotion,
      element: <SetupPromotion />,
    },
    {
      path: routes.main.promotions.promotionsDetails,
      element: <PromotionDetails />,
    },
    { path: routes.main.notifications.home, element: <Notifications /> },
    {
      path: routes.main.notifications.details,
      element: <NotificationDetails />,
    },
    { path: routes.main.notifications.send, element: <SendNotification /> },

    { path: routes.main.mailing.home, element: <Mailing /> },
    { path: routes.main.mailing.details, element: <MailDetails /> },
    { path: routes.main.mailing.send, element: <SendEmail /> },

    {
      path: routes.main.ads.home,
      element: <Ads />,
    },
    {
      path: routes.main.ads.createAd,
      element: <CreateAds />,
    },
    {
      path: routes.main.ads.editAd,
      element: <CreateAds />,
    },
    {
      path: routes.main.ads.adsDetails,
      element: <AdsDetails />,
    },

    { path: routes.main.categories.home, element: <Categories /> },
    {
      path: routes.main.categories.categoryDetails,
      element: <CategoryDetails />,
    },

    { path: routes.main.createSpolyz.home, element: <CreateSpolyz /> },
    { path: routes.main.createSpolyz.simple, element: <CreateSimpleSpolyz /> },
    { path: routes.main.createSpolyz.simpleReview, element: <ReviewSimpleSpolyz /> },
    { path: routes.main.createSpolyz.advanced, element: <CreateAdvancedSpolyz /> },
    { path: routes.main.createSpolyz.advancedQuiz.pre, element: <CreateQuiz /> },
    { path: routes.main.createSpolyz.advancedQuiz.post, element: <CreateQuiz /> },
    { path: routes.main.createSpolyz.advancedQuiz.module, element: <CreateQuiz /> },

    { path: routes.main.sponsorships.home, element: <Sponsorships /> },
    { path: routes.main.sponsorships.details, element: <SponsorshipDetails /> },
    {
      path: routes.main.sponsorships.sponsorASpoil,
      element: <SponsorshipASpoil />,
    },
    {
      path: routes.main.sponsorships.sponsorshipCodes,
      element: <SponsorshipCodes />,
    },

    { path: routes.main.transactions.home, element: <Transactions /> },
    {
      path: routes.main.withdrawalRequest.home,
      element: <WithdrawerRequest />,
    },

    {
      path: routes.main.reports.reportedTutors.home,
      element: <ReportedTutors />,
    },
    {
      path: routes.main.reports.reportedTutors.details,
      element: <ReportDetails />,
    },
    {
      path: routes.main.reports.reportedSpoylz.home,
      element: <ReportedSpoylz />,
    },
    {
      path: routes.main.reports.reportedSpoylz.details,
      element: <ReportedSpoilDetails />,
    },

    { path: routes.main.bannedUsers.home, element: <BannedUsers /> },
    {
      path: routes.main.bannedUsers.details,
      element: <BannedUserDetails />,
    },

    { path: routes.main.community.home, element: <Community /> },
    { path: routes.main.community.details, element: <CommunityDetails /> },

    { path: routes.main.customerSupport.home, element: <CustomerSupport /> },

    {
      path: routes.main.pendingVerification.home,
      element: <PendingVerification />,
    },
    {
      path: routes.main.pendingVerification.details,
      element: <VerificationDetails />,
    },

    { path: routes.main.settings.home, element: <Settings /> },
    { path: routes.main.settings.editProfile, element: <EditProfile /> },

    { path: routes.main.analytics.userInsights, element: <UserInsights /> },
    { path: routes.main.analytics.userRegistration, element: <UserRegistration /> },
    { path: routes.main.analytics.spoilsCreated, element: <SpoilsCreated /> },
    { path: routes.main.analytics.revenueGenerated, element: <RevenueGenerated /> },
    { path: routes.main.analytics.spoilTypeAnalytics, element: <SpoilTypeAnalytics /> },
    { path: routes.main.analytics.spoilPerformance.spoilOverTime, element: <SpoilOverTime /> },
    { path: routes.main.analytics.spoilPerformance.spoilPerCategory, element: <SpoilPerCategory /> },
  ];

  return (
    <Routes>
      {/* <Route element={<AuthLayout />}>
        {authRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route> */}
      <Route path={routes.auth.login} element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          {appRoutes?.map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
