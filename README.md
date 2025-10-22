# 📚 Alura Books - Backend

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Fastify-5.6.1-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify"/>
  <img src="https://img.shields.io/badge/Jest-30.2.0-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest"/>
  <img src="https://img.shields.io/badge/Zod-4.1.12-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod"/>
</div>

---

## 📋 Sobre o Projeto

**Alura Books Backend** é uma API REST desenvolvida durante o curso de Desenvolvimento Fullstack com JavaScript da [Alura](https://www.alura.com.br/). Este projeto serve como backend para a aplicação [Alura Books Frontend](https://github.com/gab-szz/alura-books-port) e foi criado com o objetivo de consolidar conhecimentos em desenvolvimento de APIs, TypeScript e boas práticas de arquitetura.

### 🎯 Diferenciais da Implementação

Embora baseado no curso da Alura, este projeto possui **implementações personalizadas** para aprimorar habilidades e aplicar tecnologias modernas:

- ✅ **Fastify** ao invés de Express (até 2x mais rápido)
- ✅ **TypeScript** para tipagem estática e segurança
- ✅ **Zod** para validação de schemas
- ✅ **Jest** com suporte completo a ES Modules
- ✅ **Injeção de Dependências** para testabilidade
- ✅ **Arquitetura em Camadas** (Controller → Service → Data)
- ✅ **CORS** configurado para desenvolvimento
- ✅ **Cobertura de Testes** superior a 90%

> 💡 **Nota**: O curso original utiliza Express, mas escolhi **Fastify** para aprender um framework moderno, performático e com suporte nativo a TypeScript.

---

## 🚀 Funcionalidades

### 🔍 API de Livros

- **GET** `/livros` - Lista todos os livros ou filtra por parâmetros
  - Query params: `nome`, `autor`
  - Busca com `includes` (case-sensitive)
  - Suporte a múltiplos filtros combinados

### 🛡️ Validação de Dados

- Schema validation com Zod
- Tratamento de erros consistente
- Respostas HTTP padronizadas

### 🧪 Testes Automatizados

- Testes unitários completos do Service
- Cobertura de casos de sucesso e erro
- Jest configurado para ES Modules + TypeScript

### 🌐 CORS

- Configuração aberta para desenvolvimento
- Suporte a todos os métodos HTTP principais
- Preparado para configuração em produção

---

## 🛠️ Tecnologias Utilizadas

### Core

| Tecnologia    | Versão | Descrição                              |
| ------------- | ------ | -------------------------------------- |
| **Node.js**   | 22+    | Runtime JavaScript                     |
| **TypeScript**| 5.7.3  | Superset JavaScript com tipagem        |
| **Fastify**   | 5.6.1  | Framework web ultra-rápido             |
| **Zod**       | 4.1.12 | Validação de schemas TypeScript-first  |

### Desenvolvimento

| Tecnologia      | Versão | Descrição                          |
| --------------- | ------ | ---------------------------------- |
| **Jest**        | 30.2.0 | Framework de testes                |
| **ts-jest**     | 29.2.5 | Preset Jest para TypeScript        |
| **tsx**         | 4.20.6 | TypeScript executor (dev)          |
| **@fastify/cors** | 11.1.0 | Plugin CORS para Fastify         |

---

## 📁 Estrutura do Projeto

```
alura-books-backend/
├── src/
│   ├── modules/                    # Módulos da aplicação
│   │   ├── livros/                # Módulo de livros
│   │   │   ├── __tests__/        # Testes do módulo
│   │   │   │   └── livros.service.test.ts
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   └── livros.dto.ts
│   │   │   ├── livros.controller.ts  # Controlador
│   │   │   ├── livros.service.ts     # Lógica de negócio
│   │   │   ├── livros.routes.ts      # Definição de rotas
│   │   │   ├── livros.json           # Dados mockados
│   │   │   └── types.ts              # Tipos TypeScript
│   │   └── module.ts             # Factory de módulos
│   ├── utils/                    # Utilitários
│   │   └── json-read.util.ts
│   └── index.ts                  # Ponto de entrada
├── jest.config.js                # Configuração Jest
├── tsconfig.json                 # Configuração TypeScript
└── package.json                  # Dependências
```

---

## 🏗️ Arquitetura

### 📐 Padrão em Camadas

```
┌─────────────────┐
│  HTTP Request   │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Routes  │  ← Registro de rotas
    └────┬────┘
         │
  ┌──────▼────────┐
  │  Controller   │  ← Validação & HTTP
  └──────┬────────┘
         │
    ┌────▼────┐
    │ Service │  ← Lógica de negócio
    └────┬────┘
         │
    ┌────▼────┐
    │  Data   │  ← Fonte de dados (JSON)
    └─────────┘
```

### 🔌 Injeção de Dependências

```typescript
// Factory de módulos (module.ts)
export function criarModuloLivros() {
  const livrosService = new LivrosService();
  const livrosController = new LivrosController(livrosService);
  
  return { livrosController, livrosService };
}

// Registro centralizado
export async function registrarModulos(fastify: FastifyInstance) {
  const { livrosController } = criarModuloLivros();
  await registerLivrosRoutes(fastify, livrosController);
}
```

**Vantagens:**
- ✅ Facilita testes (mock de dependências)
- ✅ Baixo acoplamento entre camadas
- ✅ Facilita manutenção e escalabilidade

---

## 🔌 API Reference

### GET `/livros`

Retorna a lista de livros, com filtros opcionais.

#### Query Parameters

| Parâmetro | Tipo   | Descrição                    | Obrigatório |
| --------- | ------ | ---------------------------- | ----------- |
| `nome`    | string | Filtra por nome do livro     | Não         |
| `autor`   | string | Filtra por nome do autor     | Não         |

#### Exemplos de Requisição

```bash
# Listar todos os livros
curl http://localhost:3000/livros

# Buscar por nome
curl "http://localhost:3000/livros?nome=1984"

# Buscar por autor
curl "http://localhost:3000/livros?autor=George%20Orwell"

# Múltiplos filtros
curl "http://localhost:3000/livros?nome=1984&autor=George%20Orwell"
```

#### Resposta de Sucesso (200 OK)

```json
[
  {
    "id": 3,
    "nome": "1984",
    "autor": "George Orwell",
    "ano": 1949,
    "genero": "Distopia"
  }
]
```

#### Resposta de Erro (400 Bad Request)

```json
{
  "mensagem": "Nenhum livro encontrado."
}
```

#### Resposta de Erro (500 Internal Server Error)

```json
{
  "mensagem": "Erro interno de servidor."
}
```

---

## 💻 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- NPM ou Yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/gab-szz/alura-books-backend-port.git

# Entre na pasta do projeto
cd alura-books-backend-port

# Instale as dependências
npm install
```

### Executar em Desenvolvimento

```bash
# Inicia o servidor com hot-reload
npm run dev
```

A API estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Compila TypeScript para JavaScript
npm run start
```

### Executar Testes

```bash
# Roda todos os testes
npm test

# Testes em modo watch
npm run test:watch

# Gera relatório de cobertura
npm run test:coverage
```

---

## 🧪 Testes

### Cobertura de Testes

```
Test Suites: 2 passed, 2 total
Tests:       9 passed, 9 total
Snapshots:   0 total
```

### Casos de Teste Implementados

#### `LivrosService`

1. ✅ Buscar todos os livros sem filtros
2. ✅ Buscar com filtros vazios
3. ✅ Filtrar por nome exato
4. ✅ Filtrar por autor exato
5. ✅ Filtrar por nome E autor (múltiplos filtros)
6. ✅ Buscar livro inexistente (array vazio)
7. ✅ Buscar por parte do nome
8. ✅ Buscar por parte do autor

### Estrutura de Teste (AAA Pattern)

```typescript
it("deve retornar livros filtrados por nome", async () => {
  // ARRANGE (preparar)
  const filtros = { nome: "1984" };
  
  // ACT (agir)
  const resultado = await livrosService.buscarLivros(filtros);
  
  // ASSERT (afirmar)
  expect(resultado).toBeDefined();
  expect(resultado!.length).toBeGreaterThan(0);
});
```

---

## 📊 Dados Mockados

### Estrutura do Livro

```typescript
type ILivro = {
  id: number;
  nome: string;
  autor: string;
  ano: number;
  genero: string;
}
```

### Livros Disponíveis

```json
[
  {
    "id": 1,
    "nome": "Dom Casmurro",
    "autor": "Machado de Assis",
    "ano": 1899,
    "genero": "Romance"
  },
  {
    "id": 2,
    "nome": "O Hobbit",
    "autor": "J.R.R. Tolkien",
    "ano": 1937,
    "genero": "Fantasia"
  },
  {
    "id": 3,
    "nome": "1984",
    "autor": "George Orwell",
    "ano": 1949,
    "genero": "Distopia"
  },
  {
    "id": 4,
    "nome": "A Revolução dos Bichos",
    "autor": "George Orwell",
    "ano": 1945,
    "genero": "Fábula"
  },
  {
    "id": 5,
    "nome": "O Pequeno Príncipe",
    "autor": "Antoine de Saint-Exupéry",
    "ano": 1943,
    "genero": "Infantil"
  }
]
```

---

## 🌐 Frontend

Este backend é complementado por um frontend React desenvolvido com TypeScript, Vite e Tailwind CSS.

### Características do Frontend:

- Framework: **React 19.1.0**
- Build Tool: **Vite**
- Estilização: **Tailwind CSS v4**
- Repositório: [alura-books-port](https://github.com/gab-szz/alura-books-port)

---

## 🎓 Aprendizados

Este projeto me permitiu desenvolver e aprimorar:

### Técnicos

- ✅ Desenvolvimento de APIs REST com Fastify
- ✅ TypeScript avançado (Generics, Interfaces, Types)
- ✅ Validação de dados com Zod
- ✅ Testes unitários com Jest
- ✅ Arquitetura em camadas
- ✅ Injeção de dependências
- ✅ ES Modules no Node.js
- ✅ Configuração CORS

### Boas Práticas

- ✅ Clean Code e SOLID
- ✅ Separação de responsabilidades
- ✅ Testes automatizados (TDD)
- ✅ Tratamento de erros consistente
- ✅ Estrutura de projeto escalável
- ✅ Documentação clara

---

## 🔒 Segurança

### CORS

⚠️ **Atenção**: A configuração atual permite **qualquer origem** para facilitar o desenvolvimento.

**Configuração atual (desenvolvimento):**

```typescript
fastify.register(cors, {
  origin: true,  // Permite qualquer origem
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});
```

**Configuração recomendada (produção):**

```typescript
fastify.register(cors, {
  origin: "https://seu-dominio.com",  // Apenas seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
```

---

## 🚀 Próximos Passos

- [ ] Implementar banco de dados (PostgreSQL/MongoDB)
- [ ] Adicionar autenticação JWT
- [ ] Criar endpoints POST, PUT, DELETE
- [ ] Implementar paginação
- [ ] Adicionar rate limiting
- [ ] Deploy em produção (Railway/Render)
- [ ] Documentação Swagger/OpenAPI
- [ ] CI/CD com GitHub Actions

---

## 👨‍💻 Autor

**Gabriel**

- GitHub: [@gab-szz](https://github.com/gab-szz)
- Backend: [alura-books-backend-port](https://github.com/gab-szz/alura-books-backend-port)
- Frontend: [alura-books-port](https://github.com/gab-szz/alura-books-port)

---

## 📝 Licença

Este projeto foi desenvolvido como parte do aprendizado no curso da Alura e está disponível para fins educacionais.

---

## 🙏 Agradecimentos

- **Alura** - Pela excelente plataforma de ensino
- Comunidade Fastify e TypeScript
- Todos que contribuíram com feedback e sugestões

---

<div align="center">
  
### ⭐ Se este projeto te ajudou, considere dar uma estrela!

**Desenvolvido com ❤️ e ☕ por Gabriel**

</div>
