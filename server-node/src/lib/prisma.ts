import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ['query'], // Será feito um log de cada query feita no BD
})