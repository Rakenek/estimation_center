"use client";

import { useActionState, useState } from "react";

interface CreateUserPageProps {
  action: (
    prevState: { errors?: { form: string }; success?: string },
    formData: FormData
  ) => Promise<{ errors?: { form: string }; success?: string }>;
}

export default function CreateUserForm({ action }: CreateUserPageProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useActionState(action, {
    errors: { form: "" },
    success: "",
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        action={formAction}
        className="min-w-96 max-w-sm mx-auto p-4 bg-white shadow-lg rounded-lg text-black"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Utwórz użytkownika
        </h2>
        {/* Display error message */}
        {state.errors?.form && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {state.errors.form}
          </div>
        )}

        {/* Display success message */}
        {state.success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
            {state.success}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Nazwa użytkownika
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Utwórz użytkownika
        </button>
      </form>
    </div>
  );
}
