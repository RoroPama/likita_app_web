import CatEventButton from "./CatEventButton";

interface ListCatEventProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ListCatEvent = ({
  selectedCategory,
  onCategoryChange,
}: ListCatEventProps) => {
  const catList = [
    "Tous",
    "Conférence",
    "Technologie",
    "Business",
    "Éducation",
    "Art & Culture",
    "Autre",
  ];

  return (
    <ul className="flex gap-3 flex-wrap">
      {catList.map((cat) => (
        <CatEventButton
          key={cat}
          isActive={cat === selectedCategory}
          action={onCategoryChange}
        >
          {cat}
        </CatEventButton>
      ))}
    </ul>
  );
};

export default ListCatEvent;
