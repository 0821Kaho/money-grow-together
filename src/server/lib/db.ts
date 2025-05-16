
import { PrismaClient as PrismaClientType } from '@prisma/client/edge';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

// Import dynamically to avoid TypeScript errors
// This is a workaround for the missing exports
async function getPrismaClient() {
  try {
    // Try to import from edge runtime first
    const edgeModule = await import('@prisma/client/edge');
    if (edgeModule && edgeModule.PrismaClient) {
      return edgeModule.PrismaClient;
    }
    
    // Fallback to regular Prisma client
    const regularModule = await import('@prisma/client');
    if (regularModule && regularModule.PrismaClient) {
      return regularModule.PrismaClient;
    }
    
    throw new Error('PrismaClient not found in any module');
  } catch (error) {
    console.error('Error importing Prisma client:', error);
    throw error;
  }
}

// Create and export a singleton instance
let prismaInstance: PrismaClientType;

export const getPrisma = async () => {
  if (!prismaInstance) {
    const PrismaClient = await getPrismaClient();
    prismaInstance = global.prisma || new PrismaClient();
    
    if (process.env.NODE_ENV !== 'production') {
      global.prisma = prismaInstance;
    }
  }
  
  return prismaInstance;
};

// For backward compatibility, export a pre-initialized prisma instance
export const prisma = global.prisma || ({} as PrismaClientType);

