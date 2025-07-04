import type React from "react";

interface props {
  children: React.ReactNode;
}

const EventCardHeader: React.FC<props> = ({ children }) => {
  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
};

export default EventCardHeader;
