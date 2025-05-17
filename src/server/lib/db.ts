
import { createClient } from '@prisma/client/runtime/library';

// Use a single instance of Prisma Client
export const prisma = createClient();
