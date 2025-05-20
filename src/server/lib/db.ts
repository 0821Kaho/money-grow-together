
// Create a mock implementation since we can't use the real PrismaClient in this environment

// Define the types we need for our mock
type WaitlistEntry = {
  id: string;
  email: string;
  createdAt: Date;
};

// Create a mock Prisma client
const prisma = {
  waitlist: {
    create: async (data: { data: { email: string } }) => {
      console.log('Mock DB: Creating waitlist entry', data);
      return { 
        id: `mock-${Date.now()}`, 
        email: data.data.email,
        createdAt: new Date() 
      };
    },
    findUnique: async (params: { where: { email: string } }) => {
      console.log('Mock DB: Finding waitlist entry', params);
      return null; // Always return null in mock to allow new registrations
    },
    count: async () => {
      return 13427; // Mock count
    }
  }
};

export default prisma;
