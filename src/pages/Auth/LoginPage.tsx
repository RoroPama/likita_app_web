import LabelInput from "./components/LabeInput";
import TextButton from "./components/TextButton";
import ConnexionButton from "./components/ConnexionButton";
import LoginRegisterLabel from "./components/LoginRegisterLabel";
import type React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginPageProps = {
  action: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ action }) => {
  const [errorInfo, setErrorInfo] = useState<string>("");
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorInfo("");
    clearError();

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") ?? "").toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      setErrorInfo("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      await login({ email, password });

      navigate("/home");
    } catch {
      setErrorInfo("Une erreur s'est produite lors de la connexion");
    }
  };

  const displayError = errorInfo || error?.message;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-1/2 rounded-r-xl flex flex-col justify-center gap-4 sm:gap-8 px-5 sm:px-6 py-3 "
    >
      <LoginRegisterLabel>Connectez-vous à Likita</LoginRegisterLabel>
      <div className="sm:w-full flex flex-col gap-4 sm:gap-8">
        <LabelInput label="Email" type="email" name={"email"} />
        <LabelInput label="Mot de passe" type="password" name={"password"} />
      </div>
      <div className="flex flex-col justify-center gap-6">
        {displayError && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-800 px-4 py-3 rounded-r shadow-sm animate-pulse">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p className="text-sm font-medium">{displayError}</p>
            </div>
          </div>
        )}
        <ConnexionButton
          label={isLoading ? "Connexion..." : "Se connecter"}
          Action={() => {}}
          disabled={isLoading}
        />
        <div className="flex flex-row items-center justify-center gap-1">
          <TextButton
            label="Mot de passe oublié ?"
            Action={() => {
              alert("Mot de passe oublié");
            }}
          />
          <span className="text-gray-300"> | </span>
          <TextButton label="Créer un compte" Action={action} />
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
