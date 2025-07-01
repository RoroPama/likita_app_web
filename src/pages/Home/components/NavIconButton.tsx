import React from "react";

interface NavIconButtonProps {
  children: React.ReactNode;
  action: () => void;
}

const NavIconButton: React.FC<NavIconButtonProps> = ({ children, action }) => {
  return (
    <button
      onClick={action}
      className="text-sm px-2 py-1 sm:text-base sm:px-3 sm:py-2 lg:text-lg lg:px-3 lg:py-2 
        shadow-sm border border-gray-200/60 rounded-xl 
        hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:scale-105 
        active:scale-95 active:translate-y-0 
        transition-all duration-300 ease-out 
        backdrop-blur-sm"
    >
      {children}
    </button>
  );
};

export default NavIconButton;
