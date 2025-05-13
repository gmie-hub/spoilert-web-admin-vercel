import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import { routes } from "./routes";
import Categories from "./screens/categories";
import Community from "./screens/community/index.tsx";
import Dashboard from "./screens/dashBoard/index.tsx";
import Learners from "./screens/learners";
import ViewLearnerDetails from "./screens/learners/viewLearnerDetails";
import SpoilsManagement from "./screens/spoilsManagement.tsx";
import SpoilDetails from "./screens/spoilsManagement.tsx/spoilDetails.tsx";
import Sponsorships from "./screens/sponsorships";
import Transactions from "./screens/transactions";
import Tutors from "./screens/tutors";
import TutorDetails from "./screens/tutors/tutorDetails/index.tsx";
import WithdrawerRequest from "./screens/withdrawerRequest.tsx";


function App() {
  const appRoutes = [
    { path: routes.main.dashboard, element: <Dashboard /> },
    { path: routes.main.learners.home, element: <Learners /> },
    { path: routes.main.learners.viewDetails, element: <ViewLearnerDetails /> },
    { path: routes.main.tutors.home, element: <Tutors /> },
    { path: routes.main.tutors.tutorDetails, element: <TutorDetails /> },
    { path: routes.main.spoilMgt.home, element: <SpoilsManagement /> },
    { path: routes.main.spoilMgt.spoilDetails, element: <SpoilDetails /> },
    { path: routes.main.categories.home, element: <Categories /> },
    { path: routes.main.sponsorships.home, element: <Sponsorships /> },
    { path: routes.main.transactions.home, element: <Transactions /> },
    {
      path: routes.main.withdrawalRequest.home,
      element: <WithdrawerRequest />,
    },
    { path: routes.main.community.home, element: <Community /> },
  ];

  return (
    <Routes>
      {/* <Route element={<AuthLayout />}>
        {authRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route> */}

      <Route element={<Layout />}>
        {appRoutes?.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
