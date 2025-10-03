import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../api/auth";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => resetPassword({ ...data, token }),
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target[0].value;
    const confirmPassword = e.target[1].value;
    mutate({ password, confirmPassword });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset Your Password
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition"
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Remembered your password?{" "}
          <a href="/login" className="text-indigo-500 hover:underline">
            Go back to login
          </a>
        </p>
      </div>
    </div>
  );
}
