import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import PrivateRoute from "./components/router/PrivateRoute";
import AuthLayout from "./Layouts/AuthLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/register" element={<AuthLayout />} />
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
