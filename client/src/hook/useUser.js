import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../api/auth";

export function useUser() {
  const { data, error, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  return {
    user: data || null,
    error,
    isLoading,
    isFetching,
    refetch,
  };
}
