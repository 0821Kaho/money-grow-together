
import { PrismaClient } from '@prisma/client';

// Add prisma to the global scope during development to preserve connection between hot reloads
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
