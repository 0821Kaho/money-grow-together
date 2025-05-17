
import type { Request, Response } from 'express';
import { prisma } from '../lib/db';

export const addToWaitlist = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email,
      },
    });
    
    return res.status(201).json({ message: 'Added to waitlist', id: waitlistEntry.id });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return res.status(500).json({ error: 'Failed to add to waitlist' });
  }
};

// Endpoint to get the waitlist count
export const getWaitlistCount = async (_req: Request, res: Response) => {
  try {
    const count = await prisma.waitlist.count();
    return res.status(200).json({ count });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return res.status(500).json({ error: 'Failed to get waitlist count' });
  }
};
