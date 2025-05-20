
import { PrismaClient as PrismaClientPkg } from "@prisma/client";

// Add prisma to the global scope during development to preserve connection between hot reloads
const globalForPrisma = global as unknown as { prisma: PrismaClientPkg };

export const prisma = globalForPrisma.prisma || new PrismaClientPkg();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
