
// This file handles database client connections
import { PrismaClient as PrismaClientType } from "@prisma/client";

// Workaround for the PrismaClient import issue
const PrismaClient = PrismaClientType as any;

// Create a single instance of Prisma Client
const prisma = new PrismaClient();

export { prisma };
