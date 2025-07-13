import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

// Setup
const connectionString = `${process.env.DATABASE_URL}`
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Init prisma client
const adapter = new PrismaNeon({ connectionString })
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma