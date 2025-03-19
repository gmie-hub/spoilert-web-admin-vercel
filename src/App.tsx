import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import { routes } from "./routes";
import Dashboard from "./screens/dashBoard";
import Learners from "./screens/learners";
import ViewLearnerDetails from "./screens/learners/viewLearnerDetails";

function App() {
  const appRoutes = [
    { path: routes.main.dashboard, element: <Dashboard /> },
    { path: routes.main.learners.home, element: <Learners /> },
    { path: routes.main.learners.viewDetails, element: <ViewLearnerDetails /> },
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
