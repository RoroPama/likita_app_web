import React from "react";

interface SearchIconButtonProps {
  action: () => void;
  isSearchActive?: boolean;
}

const SearchIconButton: React.FC<SearchIconButtonProps> = ({
  action,
  isSearchActive = false,
}) => {
  return (
    <button
      onClick={action}
      className={`text-sm p-2 sm:text-base sm:px-3 sm:py-2 lg:text-lg lg:px-4 lg:py-2
        shadow-sm border border-gray-200/60 rounded-full
        hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 hover:scale-105
        active:scale-95 active:translate-y-0
        transition-all duration-300 ease-out
        backdrop-blur-sm
        ${isSearchActive ? "bg-blue-50 border-blue-200 text-blue-600" : ""}`}
    >
      {isSearchActive ? "✕" : "🔍"}
    </button>
  );
};

export default SearchIconButton;
