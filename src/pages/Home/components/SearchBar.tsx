const SearchBar = () => {
  return (
    <div className="hidden sm:block w-[42%] rounded-2xl shadow-lg relative mx-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 flex items-center justify-center w-5 h-5">
          🔍
        </span>
        <input
          placeholder="Découvrez des évenements extraordaires..."
          type="text"
          className="w-full rounded-2xl py-2 pl-10 pr-4 outline-none border border-gray-200 placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
      </div>
    </div>
  );
};

export default SearchBar;
