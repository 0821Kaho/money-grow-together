
import { PrismaClient } from '@prisma/client';

// Type for the PrismaClient
type PrismaClientType = PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

let prismaInstance: PrismaClientType;

export const getPrisma = async () => {
  if (!prismaInstance) {
    try {
      // Create new PrismaClient instance or use existing one
      prismaInstance = global.prisma || new PrismaClient();
      
      // Save to global in development for hot-reload persistence
      if (process.env.NODE_ENV !== 'production') {
        global.prisma = prismaInstance;
      }
    } catch (error) {
      console.error('Failed to initialize Prisma client:', error);
      throw error;
    }
  }
  
  return prismaInstance;
};

// For backward compatibility, export a pre-initialized prisma instance
export const prisma = global.prisma || new PrismaClient();
