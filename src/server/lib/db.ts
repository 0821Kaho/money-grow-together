
import { PrismaClient as PrismaClientType } from "@prisma/client";

// Check for PrismaClient
let PrismaClient: typeof PrismaClientType;
try {
  // Import dynamically to handle potential issues
  const { PrismaClient: ImportedPrismaClient } = require("@prisma/client");
  PrismaClient = ImportedPrismaClient;
} catch (e) {
  console.error("Error importing PrismaClient:", e);
  
  // Create a mock PrismaClient for development if import fails
  PrismaClient = class MockPrismaClient {
    constructor() {
      console.warn("Using mock PrismaClient - database operations will not work");
    }
    
    // Add mock methods for any db operations used in the app
    // This prevents runtime errors when PrismaClient isn't available
  } as any;
}

// Instantiate the prisma client
const prisma = new PrismaClient();

export default prisma;
