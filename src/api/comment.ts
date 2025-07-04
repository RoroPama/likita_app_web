import type { CommentModel } from "../types/comment_model";

const getCommentsByEventId = async (
  eventId: string
): Promise<CommentModel[]> => {
  try {
    const response = await fetch(
      `http://localhost:3001/comments?eventId=${eventId}&_sort=createdAt&_order=desc`
    );

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des commentaires");
    }

    const comments: CommentModel[] = await response.json();
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
    const newComment = {
      eventId,
      user: {
        name: "Moi",
        avatar: "RP",
      },
      time: "à l'instant",
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    const response = await fetch(`http://localhost:3001/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout du commentaire");
    }

    const addedComment: CommentModel = await response.json();
    return addedComment;
  } catch (e) {
    console.error("Erreur dans addComment :", e);
    throw e;
  }
};

const deleteComment = async (commentId: string): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3001/comments/${commentId}`,
      {
        method: "DELETE",
      }
    );

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
