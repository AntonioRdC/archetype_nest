# Archetype Nest

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Projeto base para aplicações backend Node.js usando [NestJS](https://nestjs.com/), com:

- Estrutura modular organizada
- Integração com MongoDB (Mongoose)
- Validação e documentação automática de DTOs (Swagger + class-validator)
- Testes unitários com Jest

---

## Instalação

```bash
pnpm install
```

## Rodando o projeto

```bash
# Desenvolvimento
pnpm run start:dev

# Produção
pnpm run build
pnpm run start:prod
```

## Testes

```bash
# Testes unitários
pnpm run test

# Cobertura de testes (apenas no terminal)
pnpm run test:cov
```

## Estrutura de Pastas

```
src/
  app/
    modules/
      user/
        controllers/
        dtos/
        entities/
        services/
        ...
  infra/
    modules/
      database/
      healthcheck/
  config/
  main.ts
  app.module.ts
```

## Configuração de Ambiente

Crie um arquivo `.env` na raiz com as variáveis necessárias:

```
PORT=3000
MONGO_URI=mongodb://root:123@localhost:27017
MONGO_DB=reservation
```

## Docker

Para subir o MongoDB localmente:

```bash
docker-compose up -d
```

## Documentação Swagger

Acesse `/api` após rodar o projeto para visualizar a documentação interativa.

## Scripts úteis

- `pnpm run lint` — Lint do projeto
- `pnpm run format` — Formata o código
- `pnpm run test` — Testes unitários
- `pnpm run test:cov` — Cobertura de testes

## Licença

MIT
