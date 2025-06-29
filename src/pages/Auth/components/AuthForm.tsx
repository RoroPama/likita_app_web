import type React from "react";

type props = { children: React.ReactNode };

const AuthForm: React.FC<props> = ({ children }) => {
  return (
    <div className=" l w-[40%] rounded-lg bg-white flex flex-col items-center  justify-center p-12 gap-10">
      {children}
    </div>
  );
};

export default AuthForm;
