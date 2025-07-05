import { useState } from "react";
import Feed from "./Feed";
import FeedHeader from "./FeedHeader";

interface MainProps {
  searchQuery: string;
}

const Main = ({ searchQuery }: MainProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  return (
    <main className="w-full pt-20 flex flex-col items-center">
      <FeedHeader
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Feed searchQuery={searchQuery} selectedCategory={selectedCategory} />
    </main>
  );
};

export default Main;
