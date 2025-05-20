
import { Prisma } from "@prisma/client";

// Create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new Prisma.PrismaClient({
    log: ["error", "warn"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
