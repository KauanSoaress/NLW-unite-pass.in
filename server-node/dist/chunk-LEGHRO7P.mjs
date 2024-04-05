// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient({
  log: ["query"]
  // Será feito um log de cada query feita no BD
});

export {
  prisma
};
