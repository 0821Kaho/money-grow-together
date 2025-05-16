
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
      const prismaModule = await import('@prisma/client');
      
      // Try to find PrismaClient in different possible locations based on Prisma v6 structure
      const PrismaClientClass = 
        prismaModule.PrismaClient || 
        (prismaModule.default && prismaModule.default.PrismaClient) || 
        (typeof prismaModule === 'function' ? prismaModule : undefined);
      
      if (!PrismaClientClass) {
        throw new Error('PrismaClient not found in @prisma/client imports');
      }
      
      // Create new PrismaClient instance or use existing one
      prismaInstance = global.prisma || new PrismaClientClass();
      
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
    const prismaModule = require('@prisma/client');
    
    // Try to find PrismaClient in different possible locations
    const PrismaClientClass = 
      prismaModule.PrismaClient || 
      (prismaModule.default && prismaModule.default.PrismaClient) || 
      (typeof prismaModule === 'function' ? prismaModule : undefined);
    
    if (!PrismaClientClass) {
      console.error('PrismaClient not found in @prisma/client imports');
      return {};
    }
    
    return new PrismaClientClass();
  } catch (error) {
    console.error('Failed to initialize Prisma client:', error);
    return {};
  }
})();
