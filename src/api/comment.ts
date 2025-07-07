import type { CommentModel } from "../types/comment_model";
import { apiRequest } from "../utils/api_request";
import constants from "../utils/constants";

const eventUrl = `${constants.API_BASE_URL}/events`;

const getCommentsByEventId = async (
  eventId: string
): Promise<CommentModel[]> => {
  try {
    const response = await apiRequest<{ comments: CommentModel[] }>(
      `${eventUrl}/${eventId}/comments`,
      {
        insertToken: true,
      }
    );

    if (!response.success) {
      throw new Error(
        response.error || "Erreur lors du chargement des commentaires"
      );
    }

    console.log(response.data);
    return response.data?.comments || [];
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
    const response = await apiRequest<{ comment: CommentModel }>(
      `${eventUrl}/${eventId}/comments`,
      {
        method: "POST",
        insertToken: true,
        body: { text: commentText },
      }
    );

    if (!response.success) {
      console.log(response.error);
      throw new Error(
        response.error || "Erreur lors de l'ajout du commentaire"
      );
    }

    return response.data!.comment;
  } catch (e) {
    console.error("Erreur dans addComment :", e);
    throw e;
  }
};

const deleteComment = async (commentId: string): Promise<void> => {
  try {
    const response = await apiRequest(`${eventUrl}/comments/${commentId}`, {
      method: "DELETE",
      insertToken: true,
    });

    if (!response.success) {
      throw new Error(
        response.error || "Erreur lors de la suppression du commentaire"
      );
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
