
// Import PrismaClient from the client output directory
import { PrismaClient } from "../node_modules/.prisma/client";

// Create a single instance of Prisma Client
const prisma = new PrismaClient();

export default prisma;
