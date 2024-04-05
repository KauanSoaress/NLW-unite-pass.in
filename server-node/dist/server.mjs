import {
  errorHandler
} from "./chunk-7KOEUABY.mjs";
import {
  checkIn
} from "./chunk-QS2OMK2Q.mjs";
import {
  createEvent
} from "./chunk-UJV4RATC.mjs";
import "./chunk-FAPRLK3Z.mjs";
import {
  getAttendeeBadge
} from "./chunk-2XXKTAEI.mjs";
import {
  getEventAttendees
} from "./chunk-IFGEZEUM.mjs";
import {
  getEvent
} from "./chunk-HN6XBDKU.mjs";
import {
  registerForEvent
} from "./chunk-IRXSXVDW.mjs";
import "./chunk-JRO4E4TH.mjs";
import "./chunk-LEGHRO7P.mjs";

// src/server.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  // Define os frontends que podem acessar a api, no caso qualquer um, mas em uma aplicação real, colocaria o endereço real no lugar do '*'
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da APi para o back-end da aplica\xE7\xE3o pass.in construida durando o evento NLW Unite da Rocketseat.",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
  // Como o swagger deve transformar/entender o schema de cada rota
});
app.register(fastifySwaggerUI, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
export {
  app
};
