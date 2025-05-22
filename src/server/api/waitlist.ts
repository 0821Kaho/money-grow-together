
// Import the prisma client correctly
import prisma from "../lib/db";
import { Request, Response } from "express";

// Register a new waitlist entry
export async function registerWaitlist(req: Request, res: Response) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    // Check if email already exists
    const existingEntry = await prisma.waitlist.findUnique({
      where: { email }
    });
    
    if (existingEntry) {
      return res.status(409).json({ error: "Email already registered" });
    }
    
    // Create new entry
    const newEntry = await prisma.waitlist.create({
      data: { email }
    });
    
    return res.status(201).json({ success: true, data: newEntry });
  } catch (error: any) {
    console.error("Waitlist registration error:", error);
    return res.status(500).json({ error: "Failed to register for waitlist" });
  }
}

// Get waitlist count
export async function getWaitlistCount(req: Request, res: Response) {
  try {
    // This is a mock implementation since we don't have a real DB in the preview
    // In production, this would be a real count query
    return res.status(200).json({ count: 13427 });
  } catch (error) {
    console.error("Failed to fetch waitlist count", error);
    return res.status(500).json({ error: "Failed to fetch waitlist count" });
  }
}

// Get all waitlist entries
export async function getAllWaitlistEntries(req: Request, res: Response) {
  try {
    // In a real implementation, this would check for admin authentication
    // For demo purposes, we'll return mock data
    const entries = [
      { id: "1", email: "user1@example.com", createdAt: new Date("2025-05-01T10:30:00Z") },
      { id: "2", email: "user2@example.com", createdAt: new Date("2025-05-02T08:45:00Z") },
      { id: "3", email: "user3@example.com", createdAt: new Date("2025-05-02T14:20:00Z") },
      { id: "4", email: "user4@example.com", createdAt: new Date("2025-05-03T09:15:00Z") },
      { id: "5", email: "user5@example.com", createdAt: new Date("2025-05-03T16:30:00Z") },
      { id: "6", email: "user6@example.com", createdAt: new Date("2025-05-04T11:10:00Z") },
      { id: "7", email: "user7@example.com", createdAt: new Date("2025-05-04T19:05:00Z") },
      { id: "8", email: "user8@example.com", createdAt: new Date("2025-05-05T07:40:00Z") },
      { id: "9", email: "user9@example.com", createdAt: new Date("2025-05-05T13:25:00Z") },
      { id: "10", email: "user10@example.com", createdAt: new Date("2025-05-06T10:00:00Z") },
    ];
    
    return res.status(200).json({ entries });
    
    // In production with a real DB:
    // const entries = await prisma.waitlist.findMany({
    //   orderBy: { createdAt: "desc" }
    // });
    // return res.status(200).json({ entries });
  } catch (error) {
    console.error("Failed to fetch waitlist entries", error);
    return res.status(500).json({ error: "Failed to fetch waitlist entries" });
  }
}
