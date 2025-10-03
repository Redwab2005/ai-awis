import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      // Show success message or redirect user
      toast.success("Password reset link sent to your email");
    },
    onError: (error) => {
      // Show error message
      toast.error(error.message || "Something went wrong");
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot your password?
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            const email = e.target.email.value;
            mutate({ email });
          }}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            disabled={isPending || isSuccess}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
          {isSuccess && (
            <p className="text-green-600 text-center">
              Please check your email for the reset link.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
