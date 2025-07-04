import Feed from "./Feed";
import FeedHeader from "./FeedHeader";

const Main = () => {
  return (
    <main className="w-full pt-20 flex flex-col items-center">
      <FeedHeader />
      <Feed />
    </main>
  );
};

export default Main;
