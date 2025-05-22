
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

// Get all waitlist entries - Admin only endpoint
export async function getWaitlistEntries(req: Request, res: Response) {
  try {
    // Admin authorization check would go here in a production environment
    // For this demo, we'll return mock data
    
    // Mock data for the preview
    const mockEntries = [
      { id: '1', email: 'user1@example.com', createdAt: new Date(2025, 4, 1).toISOString() },
      { id: '2', email: 'user2@example.com', createdAt: new Date(2025, 4, 5).toISOString() },
      { id: '3', email: 'user3@example.com', createdAt: new Date(2025, 4, 10).toISOString() },
      { id: '4', email: 'user4@example.com', createdAt: new Date(2025, 4, 15).toISOString() },
      { id: '5', email: 'user5@example.com', createdAt: new Date(2025, 4, 20).toISOString() },
    ];
    
    // In production, this would fetch real data from the database
    // const entries = await prisma.waitlist.findMany({
    //   orderBy: { createdAt: 'desc' }
    // });
    
    return res.status(200).json(mockEntries);
  } catch (error) {
    console.error("Failed to fetch waitlist entries", error);
    return res.status(500).json({ error: "Failed to fetch waitlist entries" });
  }
}
