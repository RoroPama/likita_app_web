import type React from "react";

type ConnexionButtonProps = {
  label: string;
  Action: () => void;
};

const ConnexionButton: React.FC<ConnexionButtonProps> = ({ label, Action }) => {
  return (
    <button
      type="submit"
      onClick={Action}
      className="  hover:-translate-y-0.5 transition-transform duration-200 hover:shadow-xl text-white font-bold  bg-gradient-blue-135 text-md p-3 mt-0 rounded-xl bg-blue-400"
    >
      {label}
    </button>
  );
};

export default ConnexionButton;
