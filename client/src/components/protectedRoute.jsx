import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { Loader } from "lucide-react";

export default function ProtectedRoute() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-[#5044E5]" />
      </div>
    );
  }

  // If no user → redirect to signup/login
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  // If user exists → render children (Outlet means nested routes)
  return <Outlet />;
}
