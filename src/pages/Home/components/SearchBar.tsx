import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isMobileSearch?: boolean;
  onMobileBlur?: () => void;
}

const SearchBar = ({
  onSearch,
  isMobileSearch = false,
  onMobileBlur,
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleBlur = () => {
    setSearchQuery("");
    onSearch("");

    if (isMobileSearch && onMobileBlur) {
      onMobileBlur();
    }
  };

  if (isMobileSearch) {
    return (
      <div className="mx-2 animate-[slideInRight_0.4s_ease-out_forwards]">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center justify-center w-5 h-5">
            🔍
          </span>
          <input
            placeholder="Rechercher des événements..."
            type="text"
            className="min-w-full rounded-2xl py-2 pl-10 pr-4 outline-none border border-gray-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 shadow-lg"
            value={searchQuery}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
          />
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:block w-[60%] lg:w-[55%] xl:w-[50%] rounded-2xl shadow-lg relative mx-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center justify-center w-5 h-5">
          🔍
        </span>
        <input
          placeholder="Découvrez des événements extraordinaires..."
          type="text"
          className="w-full rounded-2xl py-2 pl-10 pr-4 outline-none border border-gray-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          value={searchQuery}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default SearchBar;
