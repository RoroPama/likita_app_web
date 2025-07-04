import type { User } from "./user";

export interface CommentModel {
  id: string;
  eventId: string;
  user: User;
  text: string;
  createdAt: string;
}
