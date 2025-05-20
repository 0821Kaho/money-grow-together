
import { PrismaClient as PrismaClientBase } from '@prisma/client';

// Create a custom type that matches your expected PrismaClient structure
type PrismaClient = PrismaClientBase;

// Add prisma to the global scope during development to preserve connection between hot reloads
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClientBase();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
