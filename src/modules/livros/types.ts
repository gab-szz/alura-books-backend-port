import type { filtrosDTO } from "./dto/livros.dto.js";

export type ILivro = {
  id: number;
  nome: string;
  autor: string;
  ano: number;
  genero: string;
};

export type IFiltrosLivros = {
  id?: number;
  nome?: string;
};

export interface ILivrosService {
  buscarLivros: (filtros: filtrosDTO) => Promise<ILivro[] | undefined>;
}
