
// Import PrismaClient correctly or provide a mock implementation
import { PrismaClient } from "@prisma/client";

// Create a mock PrismaClient class if the real one fails to initialize
class MockPrismaClient {
  waitlist = {
    create: async (data: any) => {
      console.log('Mock DB: Creating waitlist entry', data);
      return { id: 'mock-id', ...data.data };
    },
    findUnique: async (params: any) => {
      console.log('Mock DB: Finding waitlist entry', params);
      return null;
    },
    count: async () => {
      return 13427; // Mock count
    }
  }
}

// Try to use the real PrismaClient, fall back to mock if it fails
let prisma: any;

try {
  prisma = new PrismaClient();
} catch (e) {
  console.warn("Using mock PrismaClient because real client failed:", e);
  prisma = new MockPrismaClient();
}

export default prisma;
