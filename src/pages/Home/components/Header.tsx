import NavIconButton from "./NavIconButton";
import ProfileIcon from "./ProfileIcon";
import SearchBar from "./SearchBar";
import SearchIconButton from "./SearchIconButton";
const Header = () => {
  return (
    <nav className="z-10 fixed w-full h-20 shadow-md flex items-center justify-between px-4 sm:px-8 lg:px-16 bg-white">
      <div className="flex items-center gap-3 sm:gap-5">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tighter bg-gradient-blue-90 bg-clip-text text-transparent drop-shadow-lg animate-fade-in">
          Likita
        </h1>
        <div className="hidden lg:flex items-center gap-2 text-black/90 text-xs py-2 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-semibold whitespace-nowrap shadow-lg hover:bg-white/30 transition-all duration-300 group">
          <span className="animate-bounce">🎉</span>
          <span>Événements exceptionnels</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>
      <SearchBar />
      <div className="flex gap-3">
        <div className="flex sm:hidden">
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

export default Header;
