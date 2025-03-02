"use client";
import { useSession } from "next-auth/react";

import { signIn, signOut } from "@/auth/helpers";
import Button from "@/components/Button";

export default function AuthButtonClient() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        console.log("zero");
        await signOut();
        await signIn();
      }}
    >
      {session?.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}
