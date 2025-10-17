import type { FastifyInstance } from "fastify";
import type { LivrosController } from "./livros.controller.js";

export async function registerLivrosRoutes(
  fastify: FastifyInstance,
  livrosController: LivrosController
) {
  fastify.get("/livros", async (request, reply) => {
    await livrosController.consultar(request, reply);
  });
}
