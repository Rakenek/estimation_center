import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';

export async function signIn() {
  try {
    await nextAuthSignIn(); // ✅ Correctly call signIn()
  } catch (error) {
    console.error('Sign-in error:', error);
  }
}

export async function signOut() {
  await nextAuthSignOut({ redirect: true }); // ✅ Correctly call signOut()
}
