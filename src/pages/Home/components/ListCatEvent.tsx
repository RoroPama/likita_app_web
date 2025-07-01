import { useState } from "react";
import CatEventButton from "./CatEventButton";

const ListCatEvent = () => {
  const [catSelected, setCatSelected] = useState("Tous");

  const catList = ["Tous", "Tech", "Business", "Sport"];
  return (
    <ul className="flex gap-3 flex-wrap">
      {catList.map((cat) => (
        <CatEventButton
          key={cat}
          isActive={cat === catSelected}
          action={(cat: string) => {
            setCatSelected(cat);
          }}
        >
          {cat}
        </CatEventButton>
      ))}
    </ul>
  );
};

export default ListCatEvent;
