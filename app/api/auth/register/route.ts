import { z } from "zod";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const parsedFormData = z
      .object({
        job_title: z.string(),
        username: z.string(),
        password: z.string().min(6),
      })
      .safeParse(formData);

    if (parsedFormData.success) {
      const { job_title, username, password } = parsedFormData.data;

      const hashedPassword = await hash(password, 10);

      await sql<any>`
                INSERT INTO users (job_title, username, password)
                VALUES (${job_title}, ${username}, ${hashedPassword})
              `;

      return {
        status: 200,
        body: { message: "User registered successfully" },
      };
    } else {
      return {
        status: 400,
        body: { error: "Validation error", details: parsedFormData.error },
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: { error: "Internal server error" },
    };
  }
}
