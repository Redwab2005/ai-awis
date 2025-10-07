import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscribeToPremium, cancelSubscription } from "../api/auth";
import toast from "react-hot-toast";

export function useSubscribeToPremium() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscribeToPremium,
    onSuccess: (data) => {
      // Invalidate and refetch user data to get updated isPremium status
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      // Show success toast
      toast.success(
        `🎉 Successfully subscribed to ${data.data.plan} plan!`,
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#10B981',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10B981',
          },
        }
      );
    },
    onError: (error) => {
      toast.error(
        `❌ Subscription failed: ${error.message}`,
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#EF4444',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        }
      );
    },
  });
}

export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: () => {
      // Invalidate and refetch user data to get updated isPremium status
      queryClient.invalidateQueries({ queryKey: ["user"] });
      
      // Show success toast
      toast.success(
        "✅ Subscription cancelled successfully. You're now on the free plan.",
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#F59E0B',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#F59E0B',
          },
        }
      );
    },
    onError: (error) => {
      toast.error(
        `❌ Failed to cancel subscription: ${error.message}`,
        {
          duration: 4000,
          position: "top-center",
          style: {
            background: '#EF4444',
            color: '#fff',
            fontWeight: '500',
            borderRadius: '12px',
            padding: '16px 20px',
            fontSize: '14px',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        }
      );
    },
  });
}
