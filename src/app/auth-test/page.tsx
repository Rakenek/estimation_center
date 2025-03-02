import { auth } from "@/auth";
import AuthButton from "@/components/AuthButton.server";
import React from "react";

export default async function AuthTestPage() {
  const session = await auth();

  return (
    <main className="text-3xl font-bold">
      <h1>Auth Test Page</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div>
        <AuthButton />
      </div>
    </main>
  );
}
