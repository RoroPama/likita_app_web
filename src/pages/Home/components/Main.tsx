import Feed from "./Feed";
import FeedHeader from "./FeedHeader";

interface MainProps {
  searchQuery: string;
}

const Main = ({ searchQuery }: MainProps) => {
  return (
    <main className="w-full pt-20 flex flex-col items-center">
      <FeedHeader />
      <Feed searchQuery={searchQuery} />
    </main>
  );
};
export default Main;
