import type React from "react";

type loginRegisterLabelProps = {
  children: React.ReactNode;
};

const LoginRegisterLabel: React.FC<loginRegisterLabelProps> = ({
  children,
}) => {
  return (
    <h2 className="text-2xl sm:text-3xl font-extrabold sm:pr-3 text-center sm:text-left   ">
      {children}
    </h2>
  );
};

export default LoginRegisterLabel;
