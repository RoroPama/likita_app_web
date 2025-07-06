import { useQuery } from "@tanstack/react-query";
import ListEventCart from "./Event/ListEventCard";
import eventApi from "../../../api/event";

interface FeedCardProps {
  searchQuery: string;
  selectedCategory: string;
  openModal: () => void;
}

const Feed = ({ searchQuery, selectedCategory, openModal }: FeedCardProps) => {
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEventWithUsers,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="w-full">
      <ListEventCart
        error={error}
        events={events}
        isLoading={isLoading}
        refetch={refetch}
        openModal={openModal}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default Feed;
