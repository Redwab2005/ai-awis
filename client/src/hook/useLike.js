import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeToggle } from "../api/ai";

const COMMUNITY_KEY = ["community"];
const USER_KEY = ["user"];

export default function useLike() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: likeToggle,
    //run before the mutation function
    onMutate: async (creationId) => {
      if (!creationId) return {};

      await queryClient.cancelQueries({ queryKey: COMMUNITY_KEY });
      const previousCommunity = queryClient.getQueryData(COMMUNITY_KEY);
      const currentUser = queryClient.getQueryData(USER_KEY);
      const currentUserId = currentUser?._id?.toString();

      if (previousCommunity) {
        queryClient.setQueryData(COMMUNITY_KEY, (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            creations: oldData.creations.map((creation) => {
              if (creation._id !== creationId) return creation;

              const likedBy = creation.likedBy ?? [];
              const normalizedLikedBy = likedBy.map((id) =>
                id?._id ? id._id.toString() : id?.toString()
              );

              const hasLiked = currentUserId
                ? normalizedLikedBy.includes(currentUserId)
                : Boolean(creation.__optimisticLiked);

              const nextLiked = !hasLiked;
              const nextLikes = Math.max(
                0,
                (creation.likes ?? 0) + (nextLiked ? 1 : -1)
              );

              let updatedLikedBy = likedBy;
              if (currentUserId) {
                updatedLikedBy = nextLiked
                  ? [...likedBy, currentUserId]
                  : likedBy.filter(
                      (id) =>
                        (id?._id ? id._id.toString() : id?.toString()) !==
                        currentUserId
                    );
              }

              return {
                ...creation,
                likes: nextLikes,
                likedBy: updatedLikedBy,
                __optimisticLiked: nextLiked,
              };
            }),
          };
        });
      }

      return { previousCommunity };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCommunity) {
        queryClient.setQueryData(COMMUNITY_KEY, context.previousCommunity);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITY_KEY });
    },
  });

  return {
    like: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
  };
}
