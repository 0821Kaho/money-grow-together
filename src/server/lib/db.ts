
// Handle Prisma imports carefully with proper types

// For type declaration only
declare global {
  // eslint-disable-next-line no-var
  var prisma: any | undefined;
}

let prismaInstance: any;

export const getPrisma = async () => {
  if (!prismaInstance) {
    try {
      // Dynamically import Prisma client
      const { PrismaClient } = await import('@prisma/client');
      
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
export const prisma = global.prisma || (() => {
  try {
    // We need to dynamically import here for CommonJS
    const { PrismaClient } = require('@prisma/client');
    return new PrismaClient();
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    return {};
  }
})();
