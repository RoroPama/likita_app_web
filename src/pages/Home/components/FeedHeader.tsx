import ListCatEvent from "./ListCatEvent";

const FeedHeader = () => {
  return (
    <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between w-full sm:w-[96%] h-auto sm:h-20 py-4 sm:py-0 border-b px-4 sm:px-0">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black mb-3 sm:mb-0">
        Événements Populaires
      </h1>
      <ListCatEvent />
    </div>
  );
};

export default FeedHeader;
