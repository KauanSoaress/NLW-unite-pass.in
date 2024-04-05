import {
  generateSlug
} from "./chunk-FAPRLK3Z.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-LEGHRO7P.mjs";

// src/routes/create-event.ts
import { z } from "zod";
async function createEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      // Tudo passado no schema vai ser validado automaticamente pelo fastify
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        // Define a schema for the request body 
        title: z.string().min(4),
        details: z.string().nullable(),
        maximumAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (request, reply) => {
    const {
      title,
      details,
      maximumAttendees
    } = request.body;
    const slug = generateSlug(title);
    const eventWithSameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (eventWithSameSlug != null) {
      throw new BadRequest("Event with same slug already exists.");
    }
    const event = await prisma.event.create({
      // Cria um novo evento no BD
      data: {
        title,
        details,
        maximumAttendees,
        slug
      }
    });
    return reply.status(201).send({ eventId: event.id });
  });
}

export {
  createEvent
};
