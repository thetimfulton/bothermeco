/**
 * Lazy Prisma client that only connects on first use.
 * Avoids connection errors during Next.js build/static generation.
 */

let _prisma: any = null;

export function getPrismaClient() {
  if (!_prisma) {
    // Dynamic require to avoid importing at module evaluation time
    const { PrismaClient } = require("@/generated/prisma/client");
    _prisma = new PrismaClient();
  }
  return _prisma;
}

/** Proxy that lazily initializes the Prisma client on first property access */
export const prisma = new Proxy({} as any, {
  get(_target, prop) {
    const client = getPrismaClient();
    return client[prop];
  },
});
