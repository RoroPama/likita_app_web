import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import PrivateRoute from "./components/router/PrivateRoute";
import AuthLayout from "./Layouts/AuthLayout";
import NotificationPage from "./pages/Notifications/NotificationPage";
import SavedEventsPage from "./pages/Save/SavedEventsPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
        <Route path="/home/notification" element={<NotificationPage />} />
        <Route path="/home/enregistrement" element={<SavedEventsPage />} />

        <Route
          path="/home"
          element={<PrivateRoute> {<HomePage />}</PrivateRoute>}
        ></Route>

        <Route path="/" element={<Navigate to={"/home"} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
