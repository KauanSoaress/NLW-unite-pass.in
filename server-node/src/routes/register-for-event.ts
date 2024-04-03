import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function registerForEvent(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events/:eventId/attendees', {
      schema: {
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          })
        }
      }
    }, async (request, reply) => {
      const { eventId } = request.params; // Get the event ID from the request params
      const { name, email } = request.body; // Get the name and email from the request body

      const attendeeFromEmail = await prisma.attendee.findUnique({ // Check if the attendee is already registered for this event
        where: {
          eventId_email: {
            email,
            eventId
          }
        }
      });

      if (attendeeFromEmail != null) { // If the attendee is already registered for this event
        throw new Error('This e-mail is already registered for this event.')
      }

      const [event, amountOfAttendeesForEvent] = await Promise.all([ // Maneira de realizar mais de 1 await de uma só vez, para não fazer multiplas buscas no BD, demorando mais
        prisma.event.findUnique({
          where: {
            id: eventId
          }
        }),

        prisma.attendee.count({ // Get the amount of attendees for this event
          where: {
            eventId,
          }
        })
      ])

      if (event?.maximumAttendees && amountOfAttendeesForEvent >= event?.maximumAttendees) {
    throw new Error('The maximum number of attendeees for this event has been reached.')
  }

  const attendee = await prisma.attendee.create({
    data: {
      name,
      email,
      eventId,
    }
  })

  reply.status(201).send({ attendeeId: attendee.id });
})
}