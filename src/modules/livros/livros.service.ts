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
    let retorno = undefined;

    if (!params || Object.keys(params).length === 0) {
      console.log("Consultando livros sem filtros.");
      retorno = livros;
    } else if (livros) {
      console.log("Consultando livros com filtros: ", JSON.stringify(params));
      const livrosFiltrados = livros.filter((livro) => {
        let corresponde = true;

        if (params.autor) {
          corresponde = corresponde && livro.autor.includes(params.autor);
        }
        if (params.nome) {
          corresponde = corresponde && livro.nome.includes(params.nome);
        }

        return corresponde;
      });

      retorno = livrosFiltrados;
    }

    retorno
      ? console.log(`Livros obtidos: ${JSON.stringify(retorno, null, 2)}`)
      : console.log("Nenhum livro obtido");
    return retorno;
  }
}
