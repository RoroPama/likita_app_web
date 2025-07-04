import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";
import eventApi from "../../../../api/event";
import EmptyState from "../../../../components/shared/EmptyState";
import ErrorState from "../../../../components/shared/ErrorState";
import Loader from "../../../../components/shared/Loader";

const ListEventCard = () => {
  const {
    data: events,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEventWithUsers,
  });

  console.log("data", events);

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />;
  }

  if (!events?.length) {
    return <EmptyState onCreateEvent={() => {}} />;
  }

  return (
    <ul className="my-10 ">
      {events.map((event, i) => (
        <li key={event.id || i}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
};

export default ListEventCard;
