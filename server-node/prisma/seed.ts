import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: 'ec15dff9-5c07-464a-85b9-a783cb403df6',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs apaixonados(as) por código!',
      maximumAttendees: 120
    }
  })
}

seed().then(() => {
  console.log('Database seeded!');
  prisma.$disconnect()
})