import ListEventCart from "./Event/ListEventCard";

interface FeedCardProps {
  searchQuery: string;
  selectedCategory: string;
}

const Feed = ({ searchQuery, selectedCategory }: FeedCardProps) => {
  return (
    <div className="w-full">
      <ListEventCart
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Feed;
