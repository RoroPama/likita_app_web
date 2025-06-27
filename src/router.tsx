import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import HomePage from "./pages/Home/HomePage";
import PrivateRoute from "./components/router/PrivateRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
