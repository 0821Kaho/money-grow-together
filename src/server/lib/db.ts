
// For Prisma 6, we need to use a different approach
import { Prisma } from '@prisma/client';

// Create a Prisma Client instance
// In Prisma 6, PrismaClient is accessed through Prisma namespace
export const prisma = new Prisma.PrismaClient();
