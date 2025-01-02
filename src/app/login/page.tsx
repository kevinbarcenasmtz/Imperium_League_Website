"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/tournament/register";

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Login
        </h1>
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}
        <div className="space-y-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className={`w-full bg-[#ED2939] text-white font-bold py-2 rounded-md transition duration-200 flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#C62631]"
            }`}
            disabled={isSubmitting}
          >
            <FaGoogle className="mr-2" />
            {isSubmitting ? "Logging in..." : "Login with Google"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LoginLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-gray-700 dark:text-gray-300">Loading...</div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginForm />
    </Suspense>
  );
}