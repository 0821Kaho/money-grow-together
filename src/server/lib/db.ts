
// Import PrismaClient from @prisma/client as CommonJS
const { PrismaClient } = require("@prisma/client");

// Create a singleton instance of PrismaClient
const globalForPrisma = global as unknown as { prisma: InstanceType<typeof PrismaClient> };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

// In development, we want to use a single instance of PrismaClient across hot reloads
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
