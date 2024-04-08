import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        id: {},
        username: {},
        password: {},
      },
      async authorize(credentials) {
        const response = await sql<any>`
            SELECT * FROM users WHERE username = ${credentials?.username}
        `;

        const user = response.rows[0];
        if (!user) return null;

        const passwordIsCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwordIsCorrect) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
