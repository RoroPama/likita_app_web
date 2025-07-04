import type { User } from "./user";

export interface Event {
  id: string;
  userId?: string;
  organizer: User;
  type: string;
  status: "live" | "coming";
  imageUrl?: string;
  title: string;
  details: {
    date: string;
    platform: string;
  };
  description: string;
  stats?: {
    likes: number;
    comments: number;
  };
  liveUrl: string;
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt?: string;
}

export type CreateEventPayload = Omit<
  Event,
  "id" | "organizer" | "status" | "stats" | "isLiked" | "isSaved"
>;
