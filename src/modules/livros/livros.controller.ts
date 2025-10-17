import type { FastifyReply, FastifyRequest } from "fastify";
import type { ILivrosService } from "./types.js";
import { fitrosSchema, type filtrosDTO } from "./dto/livros.dto.js";

export class LivrosController {
  constructor(private readonly livrosService: ILivrosService) {}

  async consultar(request: FastifyRequest, reply: FastifyReply) {
    try {
      const parametros = request.query;
      let filtros = fitrosSchema.parse(parametros) as filtrosDTO;

      const livros = await this.livrosService.buscarLivros(filtros);

      if (livros) {
        return reply.send(livros);
      }
      return reply.code(400).send({ mensagem: "Nenhum livro encontrado." });
    } catch (erro) {
      console.error(String(erro));
      return reply.code(500).send({ mensagem: "Erro interno de servidor." });
    }
  }
}
