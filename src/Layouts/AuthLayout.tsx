import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen sm:h-screen w-screen bg-gradient-custom flex items-center justify-center">
      <div className="sm:h-[90%] w-[85%] sm:w-[70%] bg-white rounded-2xl flex flex-col sm:flex-row overflow-hidden my-5">
        <div className="h-full w-full sm:w-1/2 bg-gradient-blue-90 rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none flex flex-col items-center justify-center gap-3 py-12">
          <h1 className="text-6xl tracking-tighter text-white font-bold">
            Likita
          </h1>
          <p className="text-lg text-white px-2 text-center">
            Connectez-vous aux événements qui vous passionnent. Trouvez,
            participez, partagez !
          </p>
        </div>
        {isLogin ? (
          <LoginPage action={() => navigate("/register")} />
        ) : (
          <RegisterPage action={() => navigate("/login")} />
        )}
      </div>
    </div>
  );
}
