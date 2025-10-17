// livros.service.ts
import fs from "fs";
import path from "path";

import type { ILivro, ILivrosService } from "./types.js";
import type { filtrosDTO } from "./dto/livros.dto.js";

const livrosPath = path.join(import.meta.dirname, "livros.json");

export class LivrosService implements ILivrosService {
  constructor() {}

  async buscarLivros(params?: filtrosDTO): Promise<ILivro[] | undefined> {
    let livros: ILivro[] | undefined;
    livros = JSON.parse(fs.readFileSync(livrosPath, "utf-8"));

    if (!params || Object.keys(params).length === 0) {
      console.log("Consultando livros sem filtros.");
      return livros;
    } else if (livros) {
      console.log("Consultando livros com filtros: ", JSON.stringify(params));
      const livrosFiltrados = livros.filter((livro) => {
        if (params.autor) {
          livro.autor === params.autor;
        }
        if (params.nome) {
          livro.nome === params.nome;
        }
      });

      return livrosFiltrados;
    }

    console.log("Retorno vazio.");
    return undefined;
  }
}
