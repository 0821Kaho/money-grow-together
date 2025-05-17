
import { PrismaClient } from '@prisma/client';

// Use a single instance of Prisma Client
const prisma = new PrismaClient();

export { prisma };
