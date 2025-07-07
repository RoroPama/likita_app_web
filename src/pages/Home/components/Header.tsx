import { useState } from "react";
import NavIconButton from "./NavIconButton";
import ProfileIcon from "./ProfileIcon";
import SearchBar from "./SearchBar";
import SearchIconButton from "./SearchIconButton";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "lucide-react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  const handleMobileSearchToggle = () => {
    setIsMobileSearchActive(!isMobileSearchActive);
  };

  const handleMobileSearchBlur = () => {
    setTimeout(() => {
      setIsMobileSearchActive(false);
    }, 150);
  };

  const navigate = useNavigate();

  return (
    <nav className="z-10 fixed w-full h-20 shadow-md flex items-center justify-between px-4 sm:px-8 lg:px-16 bg-white overflow-hidden">
      <div
        className={`flex items-center gap-3 sm:gap-5 transition-all duration-500 ease-out ${
          isMobileSearchActive ? "transform -translate-x-2 scale-95" : ""
        }`}
      >
        <h1 className="text-2xl sm:text-4xl font-black tracking-tighter bg-gradient-blue-90 bg-clip-text text-transparent drop-shadow-lg">
          Likita
        </h1>
        <div
          className={`hidden lg:flex items-center gap-2 text-black/90 text-xs py-2 px-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-full font-semibold whitespace-nowrap shadow-lg hover:bg-white/30 transition-all duration-300 group ${
            isMobileSearchActive ? "opacity-50" : ""
          }`}
        >
          <span className="animate-bounce">🎉</span>
          <span>Événements exceptionnels</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
        </div>
      </div>

      <SearchBar onSearch={onSearch} />

      {isMobileSearchActive && (
        <SearchBar
          onSearch={onSearch}
          isMobileSearch={true}
          onMobileBlur={handleMobileSearchBlur}
        />
      )}

      <div className="flex gap-3">
        <div className="flex sm:hidden">
          <SearchIconButton
            action={handleMobileSearchToggle}
            isSearchActive={isMobileSearchActive}
          />
        </div>

        <div
          className={`flex gap-3 transition-all duration-500 ease-out ${
            isMobileSearchActive
              ? "opacity-0 translate-x-8 pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
        >
          <NavIconButton
            action={() => {
              navigate("/home/notification");
            }}
            isVisible={!isMobileSearchActive}
          >
            🔔
          </NavIconButton>
          <NavIconButton
            action={() => {
              alert("Page pas encore implémentée");
            }}
            isVisible={!isMobileSearchActive}
          >
            💬
          </NavIconButton>
          <NavIconButton
            action={() => {
              navigate("/home/enregistrement");
            }}
            isVisible={!isMobileSearchActive}
          >
            <Bookmark
              size={20}
              strokeWidth={2}
              className={"text-gray-600"}
              fill={"none"}
            />
          </NavIconButton>
          <div
            className={`transition-all duration-500 ease-out ${
              isMobileSearchActive
                ? "opacity-0 translate-x-4 pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
          >
            <ProfileIcon />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
