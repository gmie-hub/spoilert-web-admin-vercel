import "./App.css";
import { Route, Routes } from "react-router-dom";

import Layout from "./layouts";
import { routes } from "./routes";
import Dashboard from "./screens/dashBoard";

function App() {
  const appRoutes = [{ path: routes.dashboard, element: <Dashboard /> }];
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
