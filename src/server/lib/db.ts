
// Using CommonJS require syntax since ES module syntax is causing issues
// with how Prisma is exporting the PrismaClient
const { PrismaClient } = require("@prisma/client");

// Create a singleton instance of PrismaClient
const globalForPrisma = global as unknown as { prisma: typeof PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
