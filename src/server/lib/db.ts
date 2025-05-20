
// For Prisma 6, we need to create a PrismaClient instance
import { createClient } from '@prisma/client/edge';

// Create a Prisma Client instance
export const prisma = createClient();
