
import { PrismaClient } from "@prisma/client";

// This is a workaround for PrismaClient singleton pattern when using Next.js
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

// Approach adapted to work with both ESM and CJS module systems
// and handle different export patterns in Prisma client versions

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore - global is a Node.js global
  if (!global.prisma) {
    // @ts-ignore - global is a Node.js global
    global.prisma = new PrismaClient();
  }
  // @ts-ignore - global is a Node.js global
  prisma = global.prisma;
}

export function getPrisma() {
  return prisma;
}

export default prisma;
