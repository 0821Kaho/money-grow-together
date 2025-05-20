
import { Request, Response } from "express";
import prisma from "../lib/db";

// Add a new email to the waitlist
export const addToWaitlist = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  
  try {
    // Check if the email already exists
    const existingUser = await prisma.waitlist.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    // Create a new waitlist entry
    const waitlistEntry = await prisma.waitlist.create({
      data: { email }
    });
    
    return res.status(201).json(waitlistEntry);
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return res.status(500).json({ error: "Server error" });
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
