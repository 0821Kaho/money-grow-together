
// Mock PrismaClient for development
import { PrismaClient as OriginalPrismaClient } from "@prisma/client";

// Create a mock PrismaClient class if the original one is not available
class MockPrismaClient {
  // Add mock methods as needed
  waitlist = {
    create: async (data: any) => {
      console.log('Mock DB: Creating waitlist entry', data);
      return { id: 'mock-id', ...data.data };
    },
    findUnique: async (params: any) => {
      console.log('Mock DB: Finding waitlist entry', params);
      return null;
    }
  }
}

// Use the original PrismaClient if available, otherwise use the mock
const PrismaClient = OriginalPrismaClient || MockPrismaClient;

// Create and export the client instance
const prisma = new PrismaClient();
export default prisma;
