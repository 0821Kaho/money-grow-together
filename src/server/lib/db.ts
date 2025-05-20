
import { PrismaClient } from "@prisma/client";

// Create a single instance of Prisma Client and export it
const prisma = new PrismaClient();

export { prisma };
