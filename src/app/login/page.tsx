"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Changed from next/router
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false, // prevent automatic redirect from next-auth
  });

  if (result?.error) {
    alert(result.error); // Handle error if any
  } else {
    // Redirect to dashboard after successful login
    router.push("/dashboard");
  }

  setIsSubmitting(false);
};

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ED2939] focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </div>
          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#ED2939] focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              required
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-[#ED2939] text-white font-bold py-2 rounded-md transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#C62631]"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          {/* Google Sign-In */}
          <button
            type="button" // Added type="button" to prevent form submission
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className={`w-full bg-[#ED2939] text-white font-bold py-2 rounded-md transition duration-200 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[#C62631]"
            }`}
            disabled={isSubmitting}
          >
            Sign In with Google
          </button>
        </form>
        {/* Additional Links */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#ED2939] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}