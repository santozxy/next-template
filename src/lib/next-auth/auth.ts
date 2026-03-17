import { login } from "@/domains/auth/requests/actions";
import type { NextAuthOptions } from "next-auth";
import { getServerSession as getSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const auth = await login({
          email: credentials.email,
          password: credentials.password,
        });
        console.log("auth", auth);

        return {
          id: auth.user.id,
          email: auth.user.email,
          name: auth.user.name,
          role: auth.user.role,
          permissions: auth.user.permissions,
          municipality: auth.user.municipality,
          token: auth.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.permissions = user.permissions;
        token.municipality = user.municipality;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.municipality = token.municipality;
        session.user.permissions = token.permissions;
        session.user.token = token.token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 7, // 7 days
  },
};

export function getServerSession() {
  return getSession(authOptions);
}

export async function getPermissionsFromSession() {
  const session = await getServerSession();
  return session?.user?.permissions || [];
}
