import type React from "react";

interface Props {
  children: React.ReactNode;
  isActive: boolean;
  action: (cat: string) => void;
}

const CatEventButton: React.FC<Props> = ({ children, isActive, action }) => {
  return (
    <button
      onClick={() => {
        if (children) {
          action(children.toString());
        }
      }}
      className={`
        px-3 py-1.5 text-sm   
        sm:px-4 sm:py-2 sm:text-base  
        lg:px-6 lg:py-3 lg:text-lg    
         border rounded-full  
        transition-all duration-300
        whitespace-nowrap 
        ${
          isActive
            ? "bg-gradient-blue-90 text-white border-transparent shadow-md"
            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        }
      `}
    >
      {children}
    </button>
  );
};

export default CatEventButton;
