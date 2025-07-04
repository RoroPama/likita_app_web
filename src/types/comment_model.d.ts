export interface CommentModel {
  id: string;
  eventId: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  text: string;
  createdAt: string;
}
