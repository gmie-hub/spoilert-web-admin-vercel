import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import { routes } from "./routes";
import Categetories from "./screens/categories";
import Community from "./screens/community";
import Dashboard from "./screens/dashBoard";
import Learners from "./screens/learners";

import SpoilsManagement from "./screens/spoilsManagement.tsx";
import Sponsporships from "./screens/sponsorships";
import Transactions from "./screens/transactions";
import Tutors from "./screens/tutors";
import WithdrawerRequest from "./screens/withdrawerRequest.tsx";

import ViewLearnerDetails from "./screens/learners/viewLearnerDetails";

function App() {
  const appRoutes = [
    { path: routes.main.dashboard, element: <Dashboard /> },
    { path: routes.main.learners.home, element: <Learners /> },
    { path: routes.main.learners.viewDetails, element: <ViewLearnerDetails /> }
    { path: routes.main.tutors, element: <Tutors /> },
    { path: routes.main.spoilMgt, element: <SpoilsManagement /> },
    { path: routes.main.categories, element: <Categetories /> },
    { path: routes.main.sponsorships, element: <Sponsporships /> },
    { path: routes.main.transactions, element: <Transactions /> },
    { path: routes.main.withdrawalRequest, element: <WithdrawerRequest /> },
    { path: routes.main.community, element: <Community /> },
  ];

  return (
    <Routes>
      {/* <Route element={<AuthLayout />}>
        {authRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route> */}

      <Route element={<Layout />}>
        {appRoutes.map((item) => (
          <Route path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
