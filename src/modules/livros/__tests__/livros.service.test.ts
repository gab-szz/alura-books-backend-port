// livros.service.test.ts
import { describe, it, expect, beforeEach } from "@jest/globals";
import { LivrosService } from "../livros.service.js";

type ILivro = {
  id: number;
  nome: string;
  autor: string;
  ano: number;
  genero: string;
};

describe("LivrosService", () => {
  let livrosService: LivrosService;

  // Este bloco roda ANTES de cada teste (it)
  // Aqui você prepara o ambiente para cada testek
  beforeEach(() => {
    livrosService = new LivrosService();
  });

  // Agrupe testes relacionados em um describe
  describe("buscarLivros", () => {
    // Teste 1: Buscar todos os livros sem filtros
    it("deve retornar todos os livros quando não houver filtros", async () => {
      // ARRANGE (preparar) - preparar os dados
      // Neste caso, não precisamos preparar nada pois não tem filtros

      // ACT (agir) - executar a ação que queremos testar
      const resultado = await livrosService.buscarLivros();

      // ASSERT (afirmar) - verificar se o resultado é o esperado
      expect(resultado).toBeDefined(); // Verifica se não é undefined
      expect(Array.isArray(resultado)).toBe(true); // Verifica se é um array
      // Verifica em tempo de execução que cada item possui as propriedades esperadas
      expect(
        (resultado as ILivro[]).every(
          (livro: ILivro) =>
            typeof livro.id === "number" &&
            typeof livro.nome === "string" &&
            typeof livro.autor === "string" &&
            typeof livro.ano === "number" &&
            typeof livro.genero === "string"
        )
      ).toBe(true);
      expect(resultado!.length).toBeGreaterThan(0); // Verifica se tem pelo menos 1 livro
    });

    // Teste 2: Buscar livros com filtro vazio
    it("deve retornar todos os livros quando os filtros estiverem vazios", async () => {
      // ARRANGE
      const filtrosVazios = {};

      // ACT
      const resultado = await livrosService.buscarLivros(filtrosVazios);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
    });

    // Teste 3: Buscar livros por nome
    it("deve retornar livros filtrados por nome", async () => {
      // ARRANGE
      const filtros = { nome: "1984" };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBeGreaterThan(0);
      expect(
        (resultado as ILivro[]).every((livro) => livro.nome.includes("1984"))
      ).toBe(true);
    });

    // Teste 4: Buscar livros por autor
    it("deve retornar livros filtrados por autor", async () => {
      // ARRANGE
      const filtros = { autor: "George Orwell" };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBeGreaterThan(0);
      expect(
        (resultado as ILivro[]).every((livro) =>
          livro.autor.includes("George Orwell")
        )
      ).toBe(true);
    });

    // Teste 5: Buscar com múltiplos filtros
    it("deve retornar livros filtrados por nome e autor", async () => {
      // ARRANGE
      const filtros = {
        nome: "1984",
        autor: "George Orwell",
      };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBeGreaterThan(0);
      expect(
        (resultado as ILivro[]).every(
          (livro) =>
            livro.nome.includes("1984") && livro.autor.includes("George Orwell")
        )
      ).toBe(true);
    });

    // Teste 6: Buscar com filtro que não existe
    it("deve retornar array vazio quando nenhum livro corresponder aos filtros", async () => {
      // ARRANGE
      const filtros = { nome: "Livro Inexistente XYZ" };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBe(0);
    });

    // Teste 7: Buscar por parte do nome
    it("deve retornar livros quando o filtro é parte do nome", async () => {
      // ARRANGE
      const filtros = { nome: "Hobbit" };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBeGreaterThan(0);
      expect(
        (resultado as ILivro[]).every((livro) => livro.nome.includes("Hobbit"))
      ).toBe(true);
    });

    // Teste 8: Buscar por parte do autor
    it("deve retornar livros quando o filtro é parte do autor", async () => {
      // ARRANGE
      const filtros = { autor: "Orwell" };

      // ACT
      const resultado = await livrosService.buscarLivros(filtros);

      // ASSERT
      expect(resultado).toBeDefined();
      expect(Array.isArray(resultado)).toBe(true);
      expect((resultado as ILivro[]).length).toBe(2); // George Orwell tem 2 livros
      expect(
        (resultado as ILivro[]).every((livro) => livro.autor.includes("Orwell"))
      ).toBe(true);
    });
  });
});
