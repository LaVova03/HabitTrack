import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import PrivateRoute from "./privateRoute";
import Auth from "./containers/Auth/Auth";
import Home from "./containers/Home/Home";
import BasicInformation from "./containers/BasicInformation/BasicInformation";
import HabitTracker from "./containers/HabitTracker/HabitTracker";
import MyProfile from "./containers/MyProfile/MyProfile";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/main" element={<BasicInformation />} />
            <Route path="/tracker" element={<HabitTracker />} />

            <Route path="/profile" element={<MyProfile />} />
          </Route>
        </Route>

        <Route path="*" element={<div>404 | Page is not found !</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
