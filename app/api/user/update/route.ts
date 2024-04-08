import { z } from "zod";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const formData = await request.json();

    const parsedFormData = z
      .object({
        id: z.number(),
        job_title: z.string(),
        username: z.string(),
        previousUsername: z.string(),
      })
      .safeParse(formData);

    if (parsedFormData.success) {
      const { job_title, username, id, previousUsername } = parsedFormData.data;

      await sql<any>`
        UPDATE users
        SET job_title = ${job_title}, username = ${username}
        WHERE id = ${id} AND username = ${previousUsername}
      `;

      return NextResponse.json({
        status: 200,
        message: "User updated successfully",
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
