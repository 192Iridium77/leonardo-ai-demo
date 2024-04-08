import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const response = await sql<any>`
            SELECT * FROM users WHERE username = ${credentials?.username}
        `;

        const user = response.rows[0];

        const passwordIsCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        if (passwordIsCorrect) {
          return {
            id: user.id,
            username: user.username,
            job_title: user.job_title,
          };
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
