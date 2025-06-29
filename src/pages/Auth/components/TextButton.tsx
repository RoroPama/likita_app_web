import type React from "react";

type TextButtonProps = {
  label: string;
  Action: () => void;
};

const TextButton: React.FC<TextButtonProps> = ({ label, Action }) => {
  return (
    <button
      onClick={Action}
      className="hover:text-custom-blue1 text-secondary text-sm font-semibold"
    >
      {label}
    </button>
  );
};

export default TextButton;
