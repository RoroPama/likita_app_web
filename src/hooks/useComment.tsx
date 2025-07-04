import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import commentsApi from "../api/comment";
import type { CommentModel } from "../types/comment_model";

export const useComments = (eventId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["comments", eventId],
    queryFn: () => commentsApi.getCommentsByEventId(eventId),
    enabled,
    staleTime: 3,
    refetchOnWindowFocus: true,
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsApi.addComment,
    onSuccess: (newComment: CommentModel) => {
      queryClient.setQueryData(
        ["comments", newComment.eventId],
        (oldComments: Comment[] = []) => [newComment, ...oldComments]
      );

      queryClient.invalidateQueries({
        queryKey: ["comments", newComment.eventId],
      });
    },
    onError: (error) => {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsApi.deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du commentaire:", error);
    },
  });
};
