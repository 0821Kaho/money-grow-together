import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from "../lib/db";

const schema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      console.log(result.error);
      return new Response(JSON.stringify({ success: false, error: result.error }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const { email } = result.data;

    // Check if the email already exists in the waitlist
    const existingEntry = await prisma.waitlist.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEntry) {
      return new Response(JSON.stringify({ success: false, message: "Email already exists in the waitlist." }), {
        status: 409,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Add the email to the waitlist
    await prisma.waitlist.create({
      data: {
        email: email,
      },
    });

    return new Response(JSON.stringify({ success: true, message: "Email added to waitlist." }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ success: false, error: "Something went wrong" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
