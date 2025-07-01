import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import { useLocation, useNavigate } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen sm:h-screen w-screen bg-gradient-custom flex items-center justify-center px-4">
      <div className="   sm:h-[90%] w-[85%] sm:w-[70%] bg-white rounded-3xl flex flex-col sm:flex-row overflow-hidden shadow-2xl my-4">
        <div className=" relative h-full sm:h-full w-full sm:w-1/2 bg-gradient-blue-90 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none flex flex-col items-center justify-center gap-6  overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-16 right-12 w-32 h-32 bg-pink-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-300 rounded-full blur-lg animate-bounce delay-500"></div>
          </div>

          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Contenu principal */}
          <div className="relative z-10 text-center">
            <div className="mb-4">
              <h1 className="text-5xl sm:text-6xl tracking-tighter text-white font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
                Likita
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-pink-400 to-yellow-400 mx-auto mt-2 rounded-full"></div>
            </div>

            <p className="text-xl sm:text-2xl text-white/95 px-6 text-center leading-relaxed font-light max-w-md">
              Connectez-vous aux événements qui vous
              <span className="font-semibold text-yellow-200">
                {" "}
                passionnent
              </span>
              .
              <br />
              <span className="text-lg">Trouvez, participez, partagez !</span>
            </p>

            {/* Icônes décoratives */}
            <div className="flex justify-center gap-8 mt-8  mb-2 opacity-80">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Section Formulaire */}
        {isLogin ? (
          <LoginPage action={() => navigate("/register")} />
        ) : (
          <RegisterPage action={() => navigate("/login")} />
        )}
      </div>
    </div>
  );
}
