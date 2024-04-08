import { z } from "zod";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

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

      return NextResponse.json({
        status: 200,
        message: "User registered successfully",
      });
    } else {
      return NextResponse.json({
        status: 400,
        error: "Validation error",
        details: parsedFormData.error,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
    });
  }
}
