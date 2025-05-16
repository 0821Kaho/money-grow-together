
import { PrismaClient } from '@prisma/client';
import { PrismaClient as PrismaClientEdge } from '@prisma/client/edge';

declare global {
  var prisma: PrismaClient | undefined;
}

// Use the appropriate Prisma client based on environment
const isEdgeRuntime = typeof process.env.EDGE_RUNTIME !== 'undefined';

// Create the client with the correct implementation
export const prisma = global.prisma || (isEdgeRuntime ? new PrismaClientEdge() : new PrismaClient());

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
