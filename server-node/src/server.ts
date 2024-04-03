import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeeBadge } from "./routes/get-attendee-badge";

const app = fastify(); // Create a Fastify instance

app.setValidatorCompiler(validatorCompiler); // Set the validator compiler
app.setSerializerCompiler(serializerCompiler); // Set the serializer compiler

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)

// Define a route
app.listen({ port: 3333 }).then(() => { // A arrow function será chamada somente quando o servidor estiver no ar, por causa do then
  console.log('HTTP server running')
})