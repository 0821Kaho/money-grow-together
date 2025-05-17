
// In Prisma 6, the import syntax has changed
import { PrismaClient } from '@prisma/client';

// Use a single instance of Prisma Client
export const prisma = new PrismaClient();
