import { comparePassword } from '@/lib/bcryptFunctions';
import { prisma } from '@/lib/prisma';
import NextAuth, { User, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Nazwa użytkownika',
          type: 'text',
        },
        password: { label: 'Hasło', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials.username as string, // ✅ Correctly using 'where'
            },
          });
          if (user) {
            const isPassCorrect: boolean = await comparePassword(
              credentials.password as string,
              user.password
            );
            if (isPassCorrect) {
              return { id: user.id, name: user.username, email: user.email };
            }
          }
          return null;
        } catch (e) {
          console.error('Error', e);
          return null;
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  // pages: {
  //   signIn: "/auth/signin", // 🔥 Custom login page
  // },
  secret: process.env.NEXTAUTH_SECRET, // Secret is defined here for encryption
  session: {
    strategy: 'jwt', // Use JWT for session management
    maxAge: 5 * 24 * 60 * 60, // Session will last 30 days (in seconds)
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
