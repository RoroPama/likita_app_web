import React from "react";

interface NavIconButtonProps {
  children: React.ReactNode;
  action: () => void;
}

const NavIconButton: React.FC<NavIconButtonProps> = ({ children, action }) => {
  return (
    <button
      onClick={action}
      className="text-lg px-3 py-2 shadow-md border border-gray-200/60 rounded-xl hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y-0 transition-all duration-300 ease-out backdrop-blur-sm"
    >
      {children}
    </button>
  );
};

export default NavIconButton;
