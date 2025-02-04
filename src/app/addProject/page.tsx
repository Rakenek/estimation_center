"use client";

import { useState } from "react";
import { createUser } from "../../actions/actions";

export default function UserForm() {
  const [message, setMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    try {
      await createUser(formData);
      setMessage("User added successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message || "Something went wrong.");
      } else {
        console.log("An unknown error occurred");
      }
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg text-red-500">
      <h2 className="text-xl font-bold mb-4">Add User</h2>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="imageUrl"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      {message && <p className="mt-2 text-center">{message}</p>}
    </div>
  );
}
