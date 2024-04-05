import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod"
import { generateSlug } from "../utils/generate-slug"
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify"
import { BadRequest } from "./_errors/bad-request"

export async function createEvent(app: FastifyInstance) { // Funções que separam a aplicação em outros arquivos tem que ser assíncronas, pelo fastify
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/events', {
      schema: { // Tudo passado no schema vai ser validado automaticamente pelo fastify
        summary: 'Create an event',
        tags: ['events'],
        body: z.object({ // Define a schema for the request body 
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    }, async (request, reply) => { // Define uma rota POST para criar um evento
      const {
        title,
        details,
        maximumAttendees,
      } = request.body // Faz a validação do corpo da requisição

      const slug = generateSlug(title) // Gera um slug a partir do título do evento

      const eventWithSameSlug = await prisma.event.findUnique({
        where: {
          slug,
        }
      }) // Busca um evento com o mesmo slug

      if (eventWithSameSlug != null) {
        throw new BadRequest('Event with same slug already exists.') // Se já existir um evento com o mesmo slug, lança um erro
      }

      const event = await prisma.event.create({ // Cria um novo evento no BD
        data: {
          title,
          details,
          maximumAttendees,
          slug,
        },
      })

      return reply.status(201).send({ eventId: event.id }) // Retorna o ID do evento criado
    })
}