import type { CommentModel } from "../types/comment_model";
import constants from "../utils/constants";

const eventUrl = `${constants.API_BASE_URL}/events`;
const getCommentsByEventId = async (
  eventId: string
): Promise<CommentModel[]> => {
  try {
    const response = await fetch(`${eventUrl}/${eventId}/comments`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des commentaires");
    }
    const jsonDecoded = await response.json();

    console.log(jsonDecoded);
    const comments: CommentModel[] = jsonDecoded.comments;

    return comments;
  } catch (e) {
    console.error("Erreur dans getCommentsByEventId :", e);
    throw e;
  }
};

const addComment = async ({
  eventId,
  commentText,
}: {
  eventId: string;
  commentText: string;
}): Promise<CommentModel> => {
  try {
    const response = await fetch(`${eventUrl}/${eventId}/comments`, {
      method: "POST",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: commentText }),
    });

    if (!response.ok) {
      console.log(await response.json());
      throw new Error("Erreur lors de l'ajout du commentaire");
    }
    const jsonDecoded = await response.json();
    const addedComment: CommentModel = jsonDecoded.comment;
    return addedComment;
  } catch (e) {
    console.error("Erreur dans addComment :", e);
    throw e;
  }
};

const deleteComment = async (commentId: string): Promise<void> => {
  try {
    const response = await fetch(`${eventUrl}/comments/${commentId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression du commentaire");
    }
  } catch (e) {
    console.error("Erreur dans deleteComment :", e);
    throw e;
  }
};

const commentsApi = {
  getCommentsByEventId,
  addComment,
  deleteComment,
};

export default commentsApi;
