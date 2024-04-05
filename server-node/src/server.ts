import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler"

export const app = fastify(); // Create a Fastify instance

app.register(fastifyCors, { // Define os frontends que podem acessar a api, no caso qualquer um, mas em uma aplicação real, colocaria o endereço real no lugar do '*'
  origin: '*',
})

app.register(fastifySwagger, { 
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da APi para o back-end da aplicação pass.in construida durando o evento NLW Unite da Rocketseat.',
      version: '1.0.0'
    },
  },
  transform : jsonSchemaTransform // Como o swagger deve transformar/entender o schema de cada rota
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler); // Set the validator compiler
app.setSerializerCompiler(serializerCompiler); // Set the serializer compiler

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getEventAttendees)

app.setErrorHandler(errorHandler);

// Define a route
app.listen({ port: 3333, host: '0.0.0.0' }).then(() => { // A arrow function será chamada somente quando o servidor estiver no ar, por causa do then
  console.log('HTTP server running')
})