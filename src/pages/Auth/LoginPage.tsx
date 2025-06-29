import LabelInput from "./components/LabeInput";
import TextButton from "./components/TextButton";
import ConnexionButton from "./components/ConnexionButton";
import LoginRegisterLabel from "./components/LoginRegisterLabel";
import type React from "react";

type LoginPageProps = {
  action: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ action }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    alert(`Email: ${email}, Password: ${password}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full sm:w-1/2  rounded-r-xl flex flex-col justify-center  gap-4 sm:gap-8  px-5  sm:px-6  py-3 "
    >
      <LoginRegisterLabel>Connectez-vous à Likita</LoginRegisterLabel>
      <div className=" sm:w-full flex flex-col  gap-4 sm:gap-8  ">
        <LabelInput label="Email" type="email" name={"email"} />
        <LabelInput label="Mot de passe" type="password" name={"password"} />
      </div>
      <div className="flex flex-col justify-center gap-6 ">
        <ConnexionButton label="Se connecter" Action={() => {}} />
        <div className="  flex flex-row items-center justify-center gap-1 ">
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
