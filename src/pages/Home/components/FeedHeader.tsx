import ListCatEvent from "./ListCatEvent";
const FeedHeader = () => {
  return (
    <div className="  relative flex flex-col items-start sm:flex-row sm:items-center justify-between w-full sm:w-[96%] h-auto sm:h-24 py-6 sm:py-0 border-b-2 border-gradient-to-r from-purple-200 via-pink-200 to-blue-200 px-4 sm:px-0 bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-blue-50/30 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite]"></div>

      <div className="relative z-10">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text mb-2 sm:mb-0 animate-pulse">
          ✨ Événements Populaires
        </h1>
        <p className="text-sm text-gray-600 font-medium hidden sm:block">
          Découvrez les événements les plus tendance 🔥
        </p>
      </div>

      <div className="relative z-10 mt-3 sm:mt-0">
        <ListCatEvent />
      </div>
    </div>
  );
};

export default FeedHeader;
