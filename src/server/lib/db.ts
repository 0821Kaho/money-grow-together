
// Fixing the import for PrismaClient
import { Prisma, PrismaClient as PrismaClientType } from "@prisma/client";

// Create new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClientType({
    log: ["error", "warn"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
