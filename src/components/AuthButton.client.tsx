'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

// import { signIn, signOut } from "@/auth/helpers";
import Button from '@/components/Button';
import { Smile } from 'lucide-react';

export default function AuthButtonClient() {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut({ redirect: true });
        // await signIn();
      }}
    >
      <Smile className="mr-2" /> {session?.data?.user?.name} : Sign Out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign In</Button>
  );
}
