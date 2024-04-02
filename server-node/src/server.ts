import fastify from "fastify";
import { z } from "zod"; // Import zod
import { PrismaClient } from '@prisma/client'

const app = fastify(); // Create a Fastify instance

const prisma = new PrismaClient({
  log: ['query'], // Será feito um log de cada query feita no BD
})

// REST -> API que vai retornar dados via JSON

// Método HTTP -> GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, ... ==> Indica o que cada rota vai fazer dentro da aplicação

// Corpo da requisição (Request Body) -> Enviar dados para crição ou atualização de um registro
// Parâmetros de busca (Search Params / Query Params) -> Filtros, paginação, ordenação 'http://localhost:3333/users?search=Diego&sort=name&order=asc'
// Parâmetros de rota (Route Params) -> Identificar um recurso para atualização ou remoção 'http://localhost:3333/users/1'
// Cabeçalhos (Headers) -> Contexto de uma requisição, autenticação, idioma, ...

app.post('/events', async (request, reply) => { // Define uma rota POST para criar um evento
  const createEventSchema = z.object({ // Define a schema for the request body 
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const data = createEventSchema.parse(request.body) // Faz a validação do corpo da requisição

  const event = await prisma.event.create({ // Cria um novo evento no BD
    data: {
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees,
      slug: new Date().toISOString(),
    },
  })

  return reply.status(201).send({ eventId: event.id }) // Retorna o ID do evento criado
})

// Define a route
app.listen({ port: 3333 }).then(() => { // A arrow function será chamada somente quando o servidor estiver no ar, por causa do then
  console.log('HTTP server running')
})