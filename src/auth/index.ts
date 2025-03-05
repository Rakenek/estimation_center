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
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
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
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
