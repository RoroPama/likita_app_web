import ListEventCart from "./Event/ListEventCard";
interface FeedCardProps {
  searchQuery: string; // Add searchQuery prop
}

const Feed = ({ searchQuery }: FeedCardProps) => {
  return (
    <div className="w-full">
      <ListEventCart searchQuery={searchQuery} />
    </div>
  );
};

export default Feed;
