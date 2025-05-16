
// Type for the PrismaClient
type PrismaClientType = any;

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined;
}

let prismaInstance: PrismaClientType;

export const getPrisma = async () => {
  if (!prismaInstance) {
    try {
      // Dynamic import for Prisma client
      const prismaModule = await import('@prisma/client');
      
      // Access PrismaClient from the default export
      const PrismaClient = prismaModule.default.PrismaClient;
      
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
// This is an empty object that will be filled later
export const prisma = global.prisma || ({} as PrismaClientType);
