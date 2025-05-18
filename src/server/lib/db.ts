
// For Prisma 6, we need to create a PrismaClient instance
import { PrismaClient as PrismaClientType } from '@prisma/client/runtime/library';

// Create a Prisma Client instance
const PrismaClient = PrismaClientType;
export const prisma = new PrismaClient();
