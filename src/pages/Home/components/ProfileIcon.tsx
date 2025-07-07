import { useAuth } from "../../../hooks/useAuth";
import { AbregUserName } from "../../../utils/fonction";

const ProfileIcon = () => {
  const { user, isLoading } = useAuth();
  return (
    <div
      className="text-sm px-2 py-1 sm:text-base sm:px-3 sm:py-2 lg:text-lg lg:px-4 lg:py-2
    font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700
    shadow-md border border-blue-400/30 rounded-xl
    hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 hover:scale-105
    active:scale-95 active:translate-y-0
    transition-all duration-300 ease-out
    backdrop-blur-sm cursor-pointer select-none
    flex items-center justify-center min-w-[2.5rem] min-h-[2rem] sm:min-w-[3rem] sm:min-h-[2.5rem]"
    >
      {isLoading || !user?.username ? "  " : AbregUserName(user.username)}
    </div>
  );
};

export default ProfileIcon;
