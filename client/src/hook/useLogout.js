// useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/auth";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    },
  });
}
