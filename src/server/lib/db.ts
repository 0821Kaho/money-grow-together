
// In Prisma 6, the client is imported differently
import { createClient } from '@prisma/client/runtime/library';

// Create a Prisma Client instance
export const prisma = createClient();
