import React from "react";
import { Lock } from "lucide-react";
import { useUser } from "../hook/useUser";

export default function PremiumGate({ children }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="w-[90%] min-h-screen m-5 flex items-center justify-center">
        <div className="animate-pulse text-slate-500">Loading...</div>
      </div>
    );
  }

  if (!user || !user.isPremium) {
    return (
      <div className="w-[90%] min-h-screen m-5 flex items-center justify-center">
        <div className="max-w-xl w-full border border-slate-200 rounded-xl p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-6 h-6 text-slate-600" />
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">Premium required</h2>
          <p className="mt-2 text-slate-600">
            This tool is available for premium members. Upgrade to unlock Generate Images, Remove Background, Remove Object, and Resume Review.
          </p>
        </div>
      </div>
    );
  }

  return children;
}


