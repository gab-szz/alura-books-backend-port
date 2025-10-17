import type { FastifyInstance } from "fastify";
import { LivrosController } from "./livros/livros.controller.js";
import { LivrosService } from "./livros/livros.service.js";
import { registerLivrosRoutes } from "./livros/livros.routes.js";

export function criarModuloLivros() {
  const livrosService = new LivrosService();
  const livrosController = new LivrosController(livrosService);

  return {
    livrosController,
    livrosService,
  };
}

export async function registrarModulos(fastify: FastifyInstance) {
  const { livrosController } = criarModuloLivros();

  await registerLivrosRoutes(fastify, livrosController);
}
