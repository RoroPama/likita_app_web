import type React from "react";
import { AbregUserName } from "../../../../utils/fonction";

type EventCardProfileProps = {
  urlProfile: string | null;
  username: string;
};

const EventCardProfile: React.FC<EventCardProfileProps> = ({
  urlProfile,
  username,
}) => {
  return (
    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
      {urlProfile ? (
        <img
          src={urlProfile}
          alt={username}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-sm font-semibold text-gray-900">
          {AbregUserName(username)}
        </span>
      )}
    </div>
  );
};

export default EventCardProfile;
