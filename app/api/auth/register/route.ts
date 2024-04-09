import { z } from "zod";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { User } from "@/app/lib/definitions";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log("🚀 ~ POST ~ formData:", formData);

    const parsedFormData = z
      .object({
        job_title: z.string(),
        username: z.string(),
        password: z.string().min(6),
      })
      .safeParse(formData);

    console.log("🚀 ~ POST ~ parsedFormData.success:", parsedFormData.success);
    if (parsedFormData.success) {
      const { job_title, username, password } = parsedFormData.data;

      const hashedPassword = await hash(password, 10);

      const sqlResponse = await sql<User>`
        INSERT INTO users (job_title, username, password)
        VALUES (${job_title}, ${username}, ${hashedPassword})
        `;

      console.log("🚀 ~ POST ~ sqlResponse:", sqlResponse);

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
  } catch (error: any) {
    if (error.code === "23505") {
      return NextResponse.json({
        status: 409,
        error: "Username must be unique",
      });
    }
    return NextResponse.json({
      status: 500,
      error: "Internal server error",
    });
  }
}
