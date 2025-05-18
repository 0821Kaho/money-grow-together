
// For Prisma 6, we need to create a PrismaClient instance
import { createClient } from '@prisma/client/edge';
import { PrismaClient as PrismaClientType } from '@prisma/client/runtime/library';

// Create a Prisma Client instance
export const prisma = createClient() as unknown as PrismaClientType;
