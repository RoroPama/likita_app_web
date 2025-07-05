import { useState } from "react";
import Feed from "./Feed";
import FeedHeader from "./FeedHeader";

interface MainProps {
  searchQuery: string;
  openModal: () => void;
}

const Main = ({ searchQuery, openModal }: MainProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  return (
    <main className="w-full pt-20 flex flex-col items-center">
      <FeedHeader
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <Feed
        openModal={openModal}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </main>
  );
};

export default Main;
