// Import the generated Prisma client directly because the generator output
// is configured to `../src/generated/prisma` in `schema.prisma`.
// Importing from "@prisma/client" will fail when using a custom output path.
import { PrismaClient } from "@/generated/prisma";

declare global {
	// Allow a global `prisma` for dev to avoid exhausting DB connections on HMR
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const _global = globalThis as unknown as { prisma?: PrismaClient };
const client = _global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") _global.prisma = client;

export const prisma = client;