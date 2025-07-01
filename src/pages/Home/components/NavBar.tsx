import NavIconButton from "./NavIconButton";
import SearchBar from "./SearchBar";

const NavBar = () => {
  return (
    <nav className="h-20 shadow-lg flex items-center justify-between px-4 sm:px-8 lg:px-16 bg-white">
      <div className="flex items-center gap-3 sm:gap-5">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tighter bg-gradient-blue-90 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
          Likita
        </h1>
        <div className="hidden sm:block text-gray-600 text-xs sm:text-sm py-1 px-3 bg-gradient-to-r from-slate-100 to-slate-200 border rounded-full font-semibold whitespace-nowrap">
          Événements exceptionnels
        </div>
      </div>

      <SearchBar />

      <div className=" w-[20%] flex  justify-between  ">
        <NavIconButton action={() => {}}> 🔔</NavIconButton>
        <NavIconButton action={() => {}}> 💬</NavIconButton>
        <NavIconButton action={() => {}}> 🔖</NavIconButton>
        <div className="font-bold text-white bg-gradient-blue-180 text-lg px-3 py-2 shadow-sm border rounded-xl  hover:-translate-y-1 transition-transform duration-300">
          RP
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
