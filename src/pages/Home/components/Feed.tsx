import ListEventCart from "./Event/ListEventCard";

interface FeedCardProps {
  searchQuery: string;
  selectedCategory: string;
  openModal: () => void;
}

const Feed = ({ searchQuery, selectedCategory, openModal }: FeedCardProps) => {
  return (
    <div className="w-full">
      <ListEventCart
        openModal={openModal}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Feed;
