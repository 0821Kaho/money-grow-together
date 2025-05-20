
import { Request, Response } from "express";
import { z } from 'zod';
import { prisma } from "../lib/db";

const schema = z.object({
  email: z.string().email(),
});

// Add a new email to the waitlist
export const addToWaitlist = async (req: Request, res: Response) => {
  try {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).json({ success: false, error: result.error });
    }

    const { email } = result.data;

    // Check if the email already exists in the waitlist
    const existingEntry = await prisma.waitlist.findUnique({
      where: {
        email: email,
      },
    });

    if (existingEntry) {
      return res.status(409).json({ success: false, message: "Email already exists in the waitlist." });
    }

    // Add the email to the waitlist
    await prisma.waitlist.create({
      data: {
        email: email,
      },
    });

    return res.status(201).json({ success: true, message: "Email added to waitlist." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: "Something went wrong" });
  }
};

// Get the count of waitlist entries
export const getWaitlistCount = async (_req: Request, res: Response) => {
  try {
    const count = await prisma.waitlist.count();
    return res.status(200).json({ count });
  } catch (error) {
    console.error("Error getting waitlist count:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
