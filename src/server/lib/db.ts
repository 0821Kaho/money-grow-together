
import { PrismaClient } from '@prisma/client';

// Use a single instance of Prisma Client
export const prisma = new PrismaClient();
