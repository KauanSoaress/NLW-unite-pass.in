import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getAttendeeBadge(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .get('/attendeee/:attendeeId/badge', {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {

        },
      }
    }, async (request, reply) => {
      const { attendeeId } = request.params

      const attendee = await prisma.attendee.findUnique({
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            }
          }
        },
        where: {
          id: attendeeId,
        }
      })

      if (attendee === null) {
        throw new Error('Attendeee not found.')
      }

      return reply.send({ 
        attendee: {
          name: attendee.name,
          email: attendee.email,
          event: attendee.event.title
      } 
    })
  })
}