"use client";
import React, { useState, SyntheticEvent } from "react";
import Link from "next/link";
import { RegisterFormData } from "@/types/formData";

const Register: React.FC = () => {
  const SERVER =
    (process.env.NEXT_PUBLIC_SERVER as string) || "http://localhost:3333";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // handle submission
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Check if password and confirm password match
    if (password.length < 8 && confirmPassword.length < 8) {
      setError("Password length is too small.");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const formData: RegisterFormData = {
        username: username as string,
        email: email as string,
        password: password as string,
        confirmPassword: confirmPassword as string,
      };
      console.log(formData);

      const response = await fetch(`${SERVER}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        // Add data to local Storage
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.username);

        // redirecting to Home page after Register
        window.location.replace("/");
      } else {
        // Handle registration failure
        setError(result.error);
        console.error("Registration failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error during registration:", error);
    }
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-96 rounded-2xl border-[1px] dark:border-gray-300 bg-slate-900 dark:bg-background">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-center text-3xl text-gray-300 mb-4">Register</p>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Confirm password"
            required
          />
          {!(password === confirmPassword) && (
            <h1 className="text-red-300">Passwords donot match.</h1>
          )}
          <label className="flex cursor-pointer items-center justify-between text-slate-400">
            Accept terms of use
            <div className="relative inline-block">
              <input
                type="checkbox"
                className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              />
              <span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
            </div>
          </label>
          {error && (
            <div className="text-red-400 font-semibold">Error : {error}</div>
          )}
          <h1 className="text-sm text-[#7f8ea3] text-center">
            Already have an account?
            <Link
              className="ml-3 underline underline-offset-4 decoration-[#e1e7ef]/40 hover:decoration-[#e1e7ef]/80"
              href="/login"
            >
              Login Now
            </Link>
          </h1>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
};

export default Register;
