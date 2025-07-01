import NavIconButton from "./NavIconButton";
import ProfileIcon from "./ProfileIcon";
import SearchBar from "./SearchBar";
import SearchIconButton from "./SearchIconButton";

const NavBar = () => {
  return (
    <nav className="fix w-screen h-20 shadow-lg flex items-center justify-between px-4 sm:px-8 lg:px-16 bg-white">
      <div className="flex items-center gap-3 sm:gap-5">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tighter bg-gradient-blue-90 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
          Likita
        </h1>
        <div className="hidden sm:hidden   lg:block text-gray-600 text-xs sm:text-sm py-1 px-3 bg-gradient-to-r from-slate-100 to-slate-200 border rounded-full font-semibold whitespace-nowrap">
          Événements exceptionnelss
        </div>
      </div>

      <SearchBar />

      <div className="  flex  gap-3  ">
        <div className="flex sm:hidden ">
          <SearchIconButton action={() => {}} />
        </div>
        <NavIconButton action={() => {}}> 🔔</NavIconButton>
        <NavIconButton action={() => {}}> 💬</NavIconButton>
        <NavIconButton action={() => {}}> 🔖</NavIconButton>
        <ProfileIcon />
      </div>
    </nav>
  );
};

export default NavBar;
